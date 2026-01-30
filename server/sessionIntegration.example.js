/**
 * Example: integrate session system with Express.
 *
 * 1. On login: after validating credentials, set req.session.userId and call
 *    setCurrentSession(userId, req.sessionID). This invalidates any other session for that user.
 * 2. Use sessionSystemMiddleware after express-session. It checks single-device + inactivity.
 * 3. On logout: call destroySession(req, cb) then redirect or respond.
 *
 * Frontend: when API returns 401, parse body. If code === 'ANOTHER_DEVICE', call
 * getSessionNotifyAnotherDevice()() to show modal; if code === 'SESSION_EXPIRED',
 * logout and redirect (or show same SessionModal with inactivity message).
 */

// const express = require('express');
// const session = require('express-session');
// const { sessionSystemMiddleware, setCurrentSession, destroySession } = require('./sessionSystem');

// const app = express();

// app.use(express.json());
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'change-me',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 31 * 60 * 60 * 1000 },
// }));

// app.use(sessionSystemMiddleware);

// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   // ... validate credentials, get userId ...
//   const userId = 'user-123';
//   req.session.userId = userId;
//   req.session.user = { id: userId, username };
//   setCurrentSession(userId, req.sessionID);
//   res.json({ user: req.session.user });
// });

// app.post('/api/logout', (req, res) => {
//   destroySession(req, () => {
//     res.json({ ok: true });
//   });
// });

// app.get('/api/me', (req, res) => {
//   if (!req.session.userId) return res.status(401).json({ code: 'UNAUTHORIZED' });
//   res.json({ user: req.session.user });
// });
