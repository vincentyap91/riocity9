/**
 * Global refs so API client / fetch interceptors can trigger session modals
 * without direct access to React context. SessionProvider sets these on mount.
 */
let sessionNotifyAnotherDevice: (() => void) | null = null;
let sessionNotifyExpired: (() => void) | null = null;

export function setSessionNotifyAnotherDevice(fn: (() => void) | null): void {
  sessionNotifyAnotherDevice = fn;
}

export function getSessionNotifyAnotherDevice(): (() => void) | null {
  return sessionNotifyAnotherDevice;
}

export function setSessionNotifyExpired(fn: (() => void) | null): void {
  sessionNotifyExpired = fn;
}

export function getSessionNotifyExpired(): (() => void) | null {
  return sessionNotifyExpired;
}

/** Response body shape when backend returns 401 for session reasons */
export const SESSION_ERROR_CODES = {
  ANOTHER_DEVICE: 'ANOTHER_DEVICE',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
} as const;

export type SessionErrorCode = (typeof SESSION_ERROR_CODES)[keyof typeof SESSION_ERROR_CODES];

/**
 * Call when API returns 401 with body { code }.
 * ANOTHER_DEVICE → show "another device" modal; SESSION_EXPIRED → show inactivity modal.
 */
export function handleSessionErrorResponse(response: Response, body?: { code?: string }): boolean {
  if (response.status !== 401) return false;
  const code = body?.code ?? (body as unknown as { code?: string })?.code;
  if (code === SESSION_ERROR_CODES.ANOTHER_DEVICE) {
    getSessionNotifyAnotherDevice()?.();
    return true;
  }
  if (code === SESSION_ERROR_CODES.SESSION_EXPIRED) {
    getSessionNotifyExpired()?.();
    return true;
  }
  return false;
}
