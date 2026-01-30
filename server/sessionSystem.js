/**
 * Backend session system: single-device login + idle logout.
 *
 * 1. Single-device: one session per user. New login invalidates previous session.
 *    Requests with an invalidated session get 401 { code: 'ANOTHER_DEVICE' }.
 * 2. Idle: session destroyed after INACTIVITY_MS (30 min). Last activity updated per request.
 *    Expired sessions get 401 { code: 'SESSION_EXPIRED' }.
 *
 * Sync with frontend: frontend clears auth token and redirects on these 401s;
 * use sessionNotifyRef + SessionModal for ANOTHER_DEVICE, same modal for SESSION_EXPIRED.
 *
 * Usage: Add session middleware after express-session. On login, call setCurrentSession(userId, sessionId).
 */

const INACTIVITY_MS = 30 * 60 * 1000; // 30 min

// userId -> current session id (single-device: only this session is valid)
const currentSessionByUser = new Map();
// sessionId -> { userId, lastActivity }
const sessionData = new Map();

function getSessionId(req) {
  return req.sessionID;
}

function getUserId(req) {
  return req.session?.userId ?? req.session?.user?.id;
}

/**
 * Call after successful login: mark this session as the only valid one for this user.
 * Any other session for this user is now invalid (another device).
 */
function setCurrentSession(userId, sessionId) {
  const previous = currentSessionByUser.get(userId);
  if (previous && previous !== sessionId) {
    sessionData.delete(previous);
  }
  currentSessionByUser.set(userId, sessionId);
  sessionData.set(sessionId, { userId, lastActivity: Date.now() });
}

function updateLastActivity(req) {
  const sid = getSessionId(req);
  const data = sessionData.get(sid);
  if (data) data.lastActivity = Date.now();
}

/**
 * Middleware: single-device + inactivity.
 * - If session not the current one for this user → 401 ANOTHER_DEVICE, destroy session.
 * - If last activity older than INACTIVITY_MS → 401 SESSION_EXPIRED, destroy session.
 * - Otherwise update lastActivity and next().
 *
 * Use after express-session and after you've set req.session.userId (e.g. after login middleware).
 */
function sessionSystemMiddleware(req, res, next) {
  const sid = getSessionId(req);
  const userId = getUserId(req);

  if (!sid) return next();
  if (!userId) {
    updateLastActivity(req);
    return next();
  }

  const currentSid = currentSessionByUser.get(userId);
  if (currentSid !== sid) {
    req.session.destroy((err) => {
      if (err) console.error('Session destroy error:', err);
      res.status(401).json({
        code: 'ANOTHER_DEVICE',
        message: 'Detected login from another device. You have been logged out.',
      });
    });
    return;
  }

  const data = sessionData.get(sid);
  if (!data) {
    updateLastActivity(req);
    sessionData.set(sid, { userId, lastActivity: Date.now() });
    return next();
  }

  const now = Date.now();
  if (now - data.lastActivity > INACTIVITY_MS) {
    sessionData.delete(sid);
    currentSessionByUser.delete(userId);
    req.session.destroy((err) => {
      if (err) console.error('Session destroy error:', err);
      res.status(401).json({
        code: 'SESSION_EXPIRED',
        message: 'Session expired due to inactivity.',
      });
    });
    return;
  }

  data.lastActivity = now;
  next();
}

/**
 * Call on explicit logout: remove session from current user and data.
 */
function destroySession(req, callback) {
  const sid = getSessionId(req);
  const userId = getUserId(req);
  if (userId && currentSessionByUser.get(userId) === sid) {
    currentSessionByUser.delete(userId);
  }
  sessionData.delete(sid);
  req.session.destroy(callback);
}

module.exports = {
  INACTIVITY_MS,
  setCurrentSession,
  sessionSystemMiddleware,
  destroySession,
  updateLastActivity,
};
