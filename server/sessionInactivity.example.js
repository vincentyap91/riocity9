/**
 * Node (Express) backend: session inactivity / auto-logout after 30 min.
 *
 * - Tracks last activity per session (or per token).
 * - On each request: update lastActivity; if idle > 30 min, clear session and return 401.
 *
 * Usage:
 *   1. Use express-session (or your session middleware).
 *   2. Add this middleware after auth/session middleware.
 *   3. Optionally call updateLastActivity(req) from routes that count as "activity".
 *
 * For token-based auth: store lastActivity in DB or Redis keyed by userId/tokenId
 * and check it in a middleware that validates the token.
 */

const INACTIVITY_MS = 30 * 60 * 1000; // 30 minutes

// In-memory store: sessionId -> lastActivity timestamp (use Redis/DB in production)
const lastActivityBySession = new Map();

/**
 * Update last activity for the current session.
 * Call this in a middleware that runs on every authenticated request,
 * or only on "activity" routes (e.g. API calls that reflect user interaction).
 */
function updateLastActivity(req) {
  const sid = req.sessionID;
  if (sid) lastActivityBySession.set(sid, Date.now());
}

/**
 * Middleware: clear session and respond 401 if inactive for more than INACTIVITY_MS.
 * Add after your session middleware (e.g. express-session).
 */
function sessionInactivityMiddleware(req, res, next) {
  const sid = req.sessionID;
  if (!sid) return next();

  const now = Date.now();
  const last = lastActivityBySession.get(sid);

  if (last != null && now - last > INACTIVITY_MS) {
    lastActivityBySession.delete(sid);
    req.session.destroy((err) => {
      if (err) console.error('Session destroy error:', err);
      res.status(401).json({ code: 'SESSION_EXPIRED', message: 'Session expired due to inactivity' });
    });
    return;
  }

  updateLastActivity(req);
  next();
}

/**
 * Optional: clear token from allowlist / revoke session server-side when
 * the frontend calls a "logout" or "session/revoke" endpoint.
 */
function revokeSession(sessionId) {
  lastActivityBySession.delete(sessionId);
}

// --- Example Express setup ---

// const express = require('express');
// const session = require('express-session');
// const app = express();

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 31 * 60 * 60 * 1000 }, // e.g. 31 hours
// }));

// app.use(sessionInactivityMiddleware);

// app.get('/api/me', (req, res) => {
//   if (!req.session.userId) return res.status(401).json({ code: 'UNAUTHORIZED' });
//   res.json({ user: req.session.user });
// });

// app.post('/api/logout', (req, res) => {
//   revokeSession(req.sessionID);
//   req.session.destroy(() => res.json({ ok: true }));
// });

module.exports = {
  sessionInactivityMiddleware,
  updateLastActivity,
  revokeSession,
  INACTIVITY_MS,
};
