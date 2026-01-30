import { useEffect, useRef, useCallback, useState } from 'react';

const ACTIVITY_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'scroll',
  'touchstart',
  'click',
  'wheel',
] as const;

/** Default: show inactivity modal after 25 min; on Close we logout */
const DEFAULT_WARNING_AFTER_MS = 25 * 60 * 1000;

export const SESSION_MESSAGES = {
  ANOTHER_DEVICE:
    'Detected login from another device. You have been logged out.',
  INACTIVITY:
    "You've been inactive. You have been logged out due to inactivity.",
} as const;

export interface UseSessionManagerOptions {
  /** Called when user must be logged out (after modal Close or session invalidated) */
  onSessionEnd: () => void | Promise<void>;
  /** When false, no timers or modals (e.g. not authenticated) */
  enabled?: boolean;
  /** Override idle timeout (ms). In dev, use ?inactivityTest=1 for 15s test. */
  warningAfterMs?: number;
}

export interface UseSessionManagerReturn {
  /** Whether the session message modal is open */
  modalOpen: boolean;
  /** Message to show in the modal */
  modalMessage: string;
  /** Call when user clicks Close; clears auth and redirects */
  handleModalClose: () => void | Promise<void>;
  /** Call when backend returns 401 ANOTHER_DEVICE (e.g. from API interceptor) */
  notifyAnotherDeviceLogin: () => void;
  /** Call when backend returns 401 SESSION_EXPIRED (show same inactivity modal) */
  notifySessionExpired: () => void;
}

/**
 * Idle logout + single-device support.
 * - At 25 min inactivity: show modal with inactivity message; on Close → onSessionEnd.
 * - On visibility change (tab visible again): if idle > 25 min, show same modal (prevents background-tab bypass).
 * - notifyAnotherDeviceLogin(): show "another device" modal; on Close → onSessionEnd.
 * Tracks mouse, keyboard, scroll, touch. Reuses same modal for all messages.
 */
export function useSessionManager({
  onSessionEnd,
  enabled = true,
  warningAfterMs = DEFAULT_WARNING_AFTER_MS,
}: UseSessionManagerOptions): UseSessionManagerReturn {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(SESSION_MESSAGES.INACTIVITY);

  const lastActivityRef = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSessionEndRef = useRef(onSessionEnd);
  onSessionEndRef.current = onSessionEnd;

  const handleModalClose = useCallback(async () => {
    setModalOpen(false);
    await onSessionEndRef.current();
  }, []);

  const showInactivityModal = useCallback(() => {
    setModalMessage(SESSION_MESSAGES.INACTIVITY);
    setModalOpen(true);
  }, []);

  const notifyAnotherDeviceLogin = useCallback(() => {
    setModalMessage(SESSION_MESSAGES.ANOTHER_DEVICE);
    setModalOpen(true);
  }, []);

  const resetTimer = useCallback(() => {
    if (!enabled) return;
    lastActivityRef.current = Date.now();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      showInactivityModal();
    }, warningAfterMs);
  }, [enabled, showInactivityModal, warningAfterMs]);

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setModalOpen(false);
      return;
    }

    lastActivityRef.current = Date.now();
    resetTimer();

    const onActivity = () => resetTimer();
    ACTIVITY_EVENTS.forEach((ev) => {
      window.addEventListener(ev, onActivity, { passive: true });
    });

    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return;
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= warningAfterMs) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        showInactivityModal();
      } else {
        resetTimer();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      ACTIVITY_EVENTS.forEach((ev) => window.removeEventListener(ev, onActivity));
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [enabled, resetTimer, showInactivityModal, warningAfterMs]);

  return {
    modalOpen,
    modalMessage,
    handleModalClose,
    notifyAnotherDeviceLogin,
    notifySessionExpired: showInactivityModal,
  };
}
