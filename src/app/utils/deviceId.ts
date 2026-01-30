const STORAGE_KEY = 'riocity9_deviceId';

/**
 * Returns a stable device id for this browser (localStorage).
 * Used to detect "login from another device" via Firestore session doc.
 */
export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID?.() ?? `dev-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `dev-${Date.now()}`;
  }
}
