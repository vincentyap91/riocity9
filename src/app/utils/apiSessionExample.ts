/**
 * Example: handle 401 session errors from API so frontend shows modal and syncs logout.
 *
 * When your API client receives 401, parse the body and call the helpers below.
 * SessionProvider has registered notifyAnotherDevice via setSessionNotifyAnotherDevice,
 * so getSessionNotifyAnotherDevice()() will open the "another device" modal; on Close
 * the user is logged out and redirected.
 *
 * For Firebase/custom auth: if you use a separate backend API that returns 401
 * ANOTHER_DEVICE or SESSION_EXPIRED, use this in your fetch/axios interceptor.
 */

import { handleSessionErrorResponse } from './sessionNotifyRef';

/**
 * Example fetch wrapper: on 401, parse body and show session modal (another device or inactivity).
 */
export async function fetchWithSessionCheck(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const res = await fetch(input, init);
  if (res.status === 401) {
    let body: { code?: string } = {};
    try {
      const text = await res.clone().text();
      if (text) body = JSON.parse(text) as { code?: string };
    } catch {
      // ignore
    }
    handleSessionErrorResponse(res, body);
  }
  return res;
}

/**
 * Example: use in axios response interceptor.
 *
 * axios.interceptors.response.use(
 *   (r) => r,
 *   async (err) => {
 *     const res = err.response;
 *     if (res?.status === 401 && res?.data?.code === 'ANOTHER_DEVICE') {
 *       getSessionNotifyAnotherDevice()?.();
 *     }
 *     return Promise.reject(err);
 *   }
 * );
 */
