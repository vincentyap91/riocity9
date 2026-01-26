# Firebase Setup - Quick Reference

## Status: ✅ COMPLETE

All Firebase Authentication has been integrated. Your app is ready to use!

## Quick Start

```bash
# 1. Start your dev server
npm run dev

# 2. Test registration
# Go to: http://localhost:5173/register
# Create account with email/password

# 3. Test login  
# Go to: http://localhost:5173/login
# Use your created email/password

# 4. Test persistence
# Refresh page - you should still be logged in
```

## Key Files

| File | Purpose |
|------|---------|
| `src/app/config/firebase.ts` | Firebase initialization |
| `src/app/contexts/AuthContext.tsx` | Authentication state & methods |
| `src/app/pages/Login.tsx` | Login form (email field) |
| `src/app/pages/Register.tsx` | Registration form (email-based) |
| `.env` | Firebase credentials (SECRET - in .gitignore) |

## Core API

```tsx
// Import in any component
import { useAuth } from '@/contexts/AuthContext';

// Use in component
const { user, isAuthenticated, loading, error, login, register, logout } = useAuth();

// Login
await login(email, password);

// Register  
await register(email, password, displayName);

// Logout
await logout();
```

## User Object

```tsx
user = {
  uid: "unique_id",           // Firebase User ID
  email: "user@example.com",
  displayName: "User Name"
}
```

## State Variables

```tsx
isAuthenticated: boolean  // true if logged in
loading: boolean          // true while checking auth
error: string | null      // error message if any
```

## Form Fields

### Login
- Email (required)
- Password (min 6 chars)
- Remember Me (optional)

### Register  
- Email (required)
- Display Name (required)
- Password (min 6 chars)
- Confirm Password (must match)
- Agree to Terms (required)

## Error Messages

| Error | Message |
|-------|---------|
| Invalid email | "Please enter a valid email address" |
| Email not found | "No account found with this email" |
| Wrong password | "Incorrect password" |
| Email exists | "Email already registered" |
| Weak password | "Password too weak (min 6 chars)" |
| Too many attempts | "Too many login attempts. Try again later." |

## Security

✅ Passwords encrypted server-side  
✅ Credentials in environment variables  
✅ Session survives browser restart  
✅ Automatic token refresh  
✅ No plaintext passwords  

## Firebase Project

**ID**: riocity9-51db7  
**Region**: Default  
**Auth**: Email/Password  

## Environment Variables (.env)

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=riocity9-51db7
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

**NEVER COMMIT .env FILE!**

## Test Credentials

After registration, you can use any email/password combination you create:

```
Email: test@example.com
Password: testpassword123
```

## Common Tasks

### Protect a Route
```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

<ProtectedRoute>
  <MyProtectedPage />
</ProtectedRoute>
```

### Check if User is Authenticated
```tsx
const { isAuthenticated } = useAuth();

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}
```

### Display User Email
```tsx
const { user } = useAuth();

<span>{user?.email}</span>
```

### Logout User
```tsx
const { logout } = useAuth();

<button onClick={logout}>Logout</button>
```

## Troubleshooting

### User not logged in after refresh
- Check if `isAuthenticated` in console
- Look for errors in browser DevTools Console
- Verify `.env` has all Firebase credentials

### Can't find useAuth()
- Ensure `main.tsx` has `<AuthProvider>` wrapper
- Restart dev server after changes

### Firebase not initialized
- Check `.env` file exists
- Verify all environment variables are set
- Restart dev server

## Documentation

See these files for detailed information:

- `FIREBASE_IMPLEMENTATION_GUIDE.md` - Complete guide
- `FIREBASE_COMPLETE.md` - Setup details
- `IMPLEMENTATION_CHECKLIST.md` - What was done
- `FIREBASE_INTEGRATION_COMPLETE.md` - Summary

## Support

For issues:
1. Check browser console for errors
2. Check `.env` file is present
3. Restart dev server
4. Clear browser cache/cookies
5. Read error messages carefully

## Next Steps

1. ✅ Test login/register
2. ✅ Test session persistence  
3. ⏳ Optional: Add password reset
4. ⏳ Optional: Add Google Sign-In
5. ⏳ Optional: Add email verification

---

**Ready to use!** Start your dev server and test it out. 🎉
