# JSON Storage System Guide

## ✅ Implementation Complete

All Firebase dependencies have been removed. The app now uses **localStorage-based JSON storage** for user authentication and data.

## How It Works

### Storage Location
- **Storage Type**: Browser localStorage
- **Storage Key**: `riocity9_users` (for all users)
- **Current User Key**: `riocity9_current_user` (for logged-in user)

### Data Structure

Users are stored as a JSON array in localStorage:

```json
[
  {
    "id": "user_1234567890_abc123",
    "username": "john_doe",
    "password": "password123",
    "email": "john_doe@riocity9.com",
    "mobile": "1234567890",
    "countryCode": "+60",
    "displayName": "john_doe",
    "createdAt": "2026-01-24T10:30:00.000Z",
    "updatedAt": "2026-01-24T10:30:00.000Z",
    "agreeTerms": true,
    "agreeBonus": false
  }
]
```

## Features

### ✅ User Registration
- Creates new user with unique ID
- Validates username uniqueness
- Validates mobile number uniqueness
- Auto-generates email if not provided
- Stores all registration data

### ✅ User Login
- Authenticates username and password
- Maintains session in localStorage
- Auto-loads user on page refresh

### ✅ User Management
- Get user by username
- Get user by ID
- Get user by mobile number
- Update user data
- Delete user

### ✅ Data Persistence
- Data persists across browser sessions
- Automatically loads saved user on app start
- Session survives page refresh

## Usage

### Registration
```typescript
import { useAuth } from '../contexts/AuthContext';

const { register } = useAuth();

await register(
  'john_doe',           // username
  'password123',        // password
  '1234567890',         // mobile (optional)
  '+60'                 // countryCode (optional)
);
```

### Login
```typescript
import { useAuth } from '../contexts/AuthContext';

const { login } = useAuth();

await login('john_doe', 'password123');
```

### Access User Data
```typescript
import { useAuth } from '../contexts/AuthContext';

const { user, isAuthenticated } = useAuth();

if (isAuthenticated) {
  console.log(user.username);
  console.log(user.mobile);
  console.log(user.countryCode);
}
```

### Logout
```typescript
import { useAuth } from '../contexts/AuthContext';

const { logout } = useAuth();

await logout();
```

## Direct Storage Access

You can also use the storage service directly:

```typescript
import {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  exportUsersAsJSON,
  importUsersFromJSON,
} from '../services/jsonStorage';

// Get all users
const users = getAllUsers();

// Get specific user
const user = getUserByUsername('john_doe');

// Create user
const newUser = createUser({
  username: 'jane_doe',
  password: 'password123',
  mobile: '9876543210',
  countryCode: '+61',
  displayName: 'Jane Doe',
  agreeTerms: true,
  agreeBonus: false,
});

// Update user
updateUser(user.id, {
  mobile: '1111111111',
});

// Delete user
deleteUser(user.id);

// Export all users as JSON (for backup)
const jsonString = exportUsersAsJSON();

// Import users from JSON (for restore)
importUsersFromJSON(jsonString);
```

## Viewing Stored Data

### In Browser Console
```javascript
// View all users
JSON.parse(localStorage.getItem('riocity9_users'))

// View current logged-in user
JSON.parse(localStorage.getItem('riocity9_current_user'))
```

### Export Data

#### Automatic Download on Registration
When a user registers, the JSON file is **automatically downloaded** to your Downloads folder. The file is named: `riocity9_users_YYYY-MM-DDTHH-MM-SS.json`

To disable automatic downloads, change this in `src/app/contexts/AuthContext.tsx`:
```typescript
const AUTO_DOWNLOAD_ON_REGISTER = false; // Set to false to disable
```

#### Manual Export from Settings
1. Go to **Settings** page
2. Click **"Export Users Data"** button
3. JSON file will be downloaded automatically

#### Programmatic Export
```typescript
import { getAllUsers } from '../services/jsonStorage';
import { downloadUsersJSON } from '../utils/downloadJSON';

const allUsers = getAllUsers();
// Remove passwords before downloading
const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user);
downloadUsersJSON(usersWithoutPasswords);
```

#### Using Node.js Script (Alternative)
1. Open browser DevTools (F12)
2. Go to **Application → Local Storage**
3. Copy the value of `riocity9_users` key
4. Save it as `scripts/users-export.json`
5. Run: `node scripts/export-users.js`
6. File will be saved to `data/users.json`

## Security Notes

⚠️ **Important Security Considerations:**

1. **Passwords are stored in plain text** - This is for development/testing only
2. **For production**, you should:
   - Hash passwords using bcrypt or similar
   - Never store plain text passwords
   - Use HTTPS for all connections
   - Implement proper authentication tokens

### Example: Hash Passwords (Production)

```typescript
import bcrypt from 'bcryptjs';

// When creating user
const hashedPassword = await bcrypt.hash(password, 10);
createUser({ ...userData, password: hashedPassword });

// When authenticating
const user = getUserByUsername(username);
const isValid = await bcrypt.compare(password, user.password);
```

## Data Location

- **Browser**: localStorage (persists until cleared)
- **Storage Limit**: ~5-10MB per domain (usually enough for thousands of users)
- **Persistence**: Survives browser restart, cleared when:
  - User clears browser data
  - User uses incognito/private mode
  - Browser storage quota exceeded

## Migration from Firebase

If you had Firebase users, you can migrate them:

1. Export Firebase users data
2. Convert to the JSON format above
3. Use `importUsersFromJSON()` to import

## Troubleshooting

### Users not persisting?
- Check browser localStorage is enabled
- Check storage quota hasn't been exceeded
- Verify data is being saved (check browser DevTools → Application → Local Storage)

### Login not working?
- Verify username and password are correct
- Check user exists: `getUserByUsername(username)`
- Check browser console for errors

### Data lost?
- localStorage can be cleared by browser
- Check if user cleared browser data
- Consider implementing backup/export functionality

## Advantages

✅ **No external dependencies** - No Firebase setup needed
✅ **Fast** - Instant read/write operations
✅ **Simple** - Easy to understand and debug
✅ **Offline** - Works without internet connection
✅ **No costs** - No Firebase billing

## Limitations

⚠️ **Browser-only** - Data stored locally in browser
⚠️ **Not shared** - Each browser/device has separate data
⚠️ **Can be cleared** - Users can clear browser data
⚠️ **No server sync** - No automatic backup to server
⚠️ **Security** - Passwords stored in plain text (for dev only)

## Next Steps

1. ✅ **Add password hashing** for production
2. ✅ **Implement data export/import** UI
3. ✅ **Add user profile update** functionality
4. ✅ **Consider server-side storage** for production
5. ✅ **Add data backup** mechanism
