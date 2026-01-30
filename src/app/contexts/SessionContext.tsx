import React, { createContext, useContext, useRef, useCallback, useEffect, useMemo, ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useSessionManager } from '../hooks/useSessionManager';
import { SessionModal } from '../components/shared/SessionModal';
import { setSessionNotifyAnotherDevice, setSessionNotifyExpired } from '../utils/sessionNotifyRef';

type NotifyAnotherDeviceLogin = () => void;

const SessionContext = createContext<NotifyAnotherDeviceLogin | undefined>(undefined);

/** In dev, ?inactivityTest=1 uses 15s timeout so you can test the modal without waiting 25 min */
const DEV_TEST_TIMEOUT_MS = 15 * 1000;

export function SessionProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const useTestTimeout = import.meta.env.DEV && searchParams.get('inactivityTest') === '1';
  const warningAfterMs = useMemo(
    () => (useTestTimeout ? DEV_TEST_TIMEOUT_MS : undefined),
    [useTestTimeout]
  );

  const onSessionEnd = useCallback(async () => {
    await logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  const {
    modalOpen,
    modalMessage,
    handleModalClose,
    notifyAnotherDeviceLogin,
    notifySessionExpired,
  } = useSessionManager({
    onSessionEnd,
    enabled: isAuthenticated,
    ...(warningAfterMs !== undefined && { warningAfterMs }),
  });

  const notifyRef = useRef(notifyAnotherDeviceLogin);
  notifyRef.current = notifyAnotherDeviceLogin;
  const stableNotify = useCallback(() => notifyRef.current(), []);

  useEffect(() => {
    setSessionNotifyAnotherDevice(stableNotify);
    setSessionNotifyExpired(notifySessionExpired);
    return () => {
      setSessionNotifyAnotherDevice(null);
      setSessionNotifyExpired(null);
    };
  }, [stableNotify, notifySessionExpired]);

  return (
    <SessionContext.Provider value={stableNotify}>
      {children}
      <SessionModal
        open={modalOpen}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </SessionContext.Provider>
  );
}

export function useSessionNotify(): NotifyAnotherDeviceLogin {
  const notify = useContext(SessionContext);
  if (notify === undefined) {
    throw new Error('useSessionNotify must be used within SessionProvider');
  }
  return notify;
}
