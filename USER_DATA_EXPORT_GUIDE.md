# User Data Export Guide

## ✅ Automatic File Download on Registration

When a user registers, a JSON file is **automatically downloaded** to your Downloads folder.

### File Details
- **Filename Format**: `riocity9_users_YYYY-MM-DDTHH-MM-SS.json`
- **Location**: Browser's default Downloads folder
- **Content**: All registered users (passwords removed for security)
- **Format**: Pretty-printed JSON (2-space indentation)

### Example Filename
```
riocity9_users_2026-01-24T14-30-45.json
```

### Disable Automatic Downloads

If you don't want automatic downloads on every registration, edit `src/app/contexts/AuthContext.tsx`:

```typescript
// Change this line (around line 145):
const AUTO_DOWNLOAD_ON_REGISTER = false; // Set to false
```

## Manual Export from App

### Method 1: Settings Page (Recommended)

1. **Login** to your app
2. Go to **Settings** page
3. Click **"Export Users Data"** button
4. JSON file will be downloaded automatically

### Method 2: Browser Console

Open browser console (F12) and run:

```javascript
// Get all users
const users = JSON.parse(localStorage.getItem('riocity9_users') || '[]');

// Remove passwords
const usersWithoutPasswords = users.map(({password, ...user}) => user);

// Copy to clipboard
navigator.clipboard.writeText(JSON.stringify(usersWithoutPasswords, null, 2));

// Or download
const blob = new Blob([JSON.stringify(usersWithoutPasswords, null, 2)], {type: 'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `users_${new Date().toISOString().slice(0,10)}.json`;
a.click();
```

## Using Node.js Script

### Step 1: Export from Browser
1. Open browser DevTools (F12)
2. Go to **Application** tab → **Local Storage**
3. Find the key: `riocity9_users`
4. Copy the entire value (right-click → Copy)
5. Create file: `scripts/users-export.json`
6. Paste the copied JSON into this file

### Step 2: Run Script
```bash
node scripts/export-users.js
```

### Output
- File saved to: `data/users.json`
- Passwords automatically removed
- Pretty-printed format

## File Structure

### Exported JSON Format
```json
[
  {
    "id": "user_1234567890_abc123",
    "username": "john_doe",
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

**Note**: Passwords are **never** included in exported files for security.

## Where Files Are Saved

### Automatic Downloads
- **Location**: Browser's default Downloads folder
- **Path Examples**:
  - Windows: `C:\Users\YourName\Downloads\`
  - Mac: `~/Downloads/`
  - Linux: `~/Downloads/`

### Node.js Script Output
- **Location**: `data/users.json` (in project root)
- **Directory**: Created automatically if it doesn't exist

## Tips

1. **Organize Files**: Move downloaded files to a `data/` or `exports/` folder
2. **Backup Regularly**: Export data periodically for backup
3. **Version Control**: Don't commit user data files to git (add to `.gitignore`)
4. **Security**: Never share exported files containing user data

## Troubleshooting

### Downloads Not Working?
- Check browser download permissions
- Ensure pop-up blocker isn't blocking downloads
- Check Downloads folder exists and is accessible

### File Not Found?
- Check browser's default Downloads location
- Search for files starting with `riocity9_users_`
- Check browser download history

### Script Errors?
- Ensure Node.js is installed: `node --version`
- Check `scripts/users-export.json` exists and is valid JSON
- Verify file permissions

## Security Reminder

⚠️ **Important**: 
- Exported files contain user data (usernames, emails, mobile numbers)
- Passwords are **never** exported
- Keep exported files secure
- Don't share or commit to version control
- Add to `.gitignore`:
  ```
  data/users.json
  scripts/users-export.json
  *.json (in exports folder)
  ```
