# Firebase Setup - Step by Step Guide

## ✅ Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name (e.g., "Riocity9")
4. Click **Continue**
5. **Disable** Google Analytics (optional, you can enable later)
6. Click **Create project**
7. Wait for project creation (takes ~30 seconds)
8. Click **Continue**

## ✅ Step 2: Get Firebase Web App Credentials

1. In Firebase Console, click the **gear icon** ⚙️ (top left)
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>` (or "Add app" → Web)
5. Register your app:
   - **App nickname**: "Riocity9 Web" (or any name)
   - **Firebase Hosting**: Leave unchecked (optional)
   - Click **"Register app"**
6. **Copy the config values** that appear (you'll see something like):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-XXXXXXXXXX"
};
```

## ✅ Step 3: Update .env File

1. Open your `.env` file in the project root
2. Replace the placeholder values with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSy... (from apiKey)
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important**: 
- Copy the values EXACTLY as shown
- Don't include quotes around the values
- Don't add spaces before/after the `=` sign

## ✅ Step 4: Enable Firebase Authentication

1. In Firebase Console, go to **"Authentication"** (left sidebar)
2. Click **"Get started"** (if first time)
3. Click on **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. **Enable** "Email/Password" (toggle ON)
6. Click **"Save"**

## ✅ Step 5: Enable Firestore Database

1. In Firebase Console, go to **"Firestore Database"** (left sidebar)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
   - ⚠️ **Note**: Test mode allows read/write for 30 days. We'll set up security rules next.
4. Select a **location** for your database (choose closest to your users)
5. Click **"Enable"**
6. Wait for database creation (~1 minute)

## ✅ Step 6: Set Up Firestore Security Rules

1. In Firestore Database, click on **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"** to save the rules

**What this does**:
- Only authenticated users can access the `users` collection
- Users can only read/write their own document (matching their Firebase Auth UID)
- Prevents unauthorized access to other users' data

## ✅ Step 7: Restart Your Dev Server

After updating `.env` file:

```bash
# Stop your current dev server (Ctrl+C)
# Then restart:
npm run dev
```

**Why**: Environment variables are loaded when the server starts, so you need to restart.

## ✅ Step 8: Test the Setup

### Test Registration:
1. Go to `http://localhost:5173/register` (or your dev URL)
2. Fill in the registration form:
   - Username: `testuser`
   - Mobile: `1234567890`
   - Password: `password123`
   - Select country code
3. Click **"Sign Up"**
4. Should redirect to home page

### Verify in Firebase Console:
1. Go to **Firestore Database** → **Data** tab
2. You should see a `users` collection
3. Click on it to see your registered user document
4. The document ID will be the user's Firebase Auth UID

### Test Login:
1. Go to `http://localhost:5173/login`
2. Enter:
   - Username: `testuser`
   - Password: `password123`
3. Click **"Log In"**
4. Should login successfully

## Troubleshooting

### Error: "Firebase configuration is incomplete"
- ✅ Check `.env` file exists in project root
- ✅ Verify all 7 environment variables are set
- ✅ Make sure variable names start with `VITE_`
- ✅ Restart dev server after updating `.env`

### Error: "Permission denied" when registering
- ✅ Check Firestore security rules are published
- ✅ Verify rules allow authenticated users to write
- ✅ Check Firestore is enabled (not just created)

### Error: "Email/Password sign-up is not enabled"
- ✅ Go to Firebase Console → Authentication → Sign-in method
- ✅ Enable "Email/Password"
- ✅ Click Save

### Users not appearing in Firestore
- ✅ Check browser console for errors
- ✅ Verify Firestore is enabled (not just created)
- ✅ Check network tab in DevTools for failed requests
- ✅ Ensure you're looking at the correct Firebase project

### Can't find Firestore Database option
- ✅ Make sure you're in the correct Firebase project
- ✅ Firestore might be called "Cloud Firestore" in some regions
- ✅ Try refreshing the Firebase Console page

## Quick Checklist

- [ ] Firebase project created
- [ ] Web app registered in Firebase
- [ ] Credentials copied to `.env` file
- [ ] Firebase Authentication enabled (Email/Password)
- [ ] Firestore Database created
- [ ] Security rules set and published
- [ ] Dev server restarted
- [ ] Test registration works
- [ ] Test login works
- [ ] User data appears in Firestore

## Next Steps After Setup

1. ✅ **Test registration and login**
2. ✅ **Verify data in Firestore Console**
3. ✅ **Test session persistence** (refresh page, should stay logged in)
4. ✅ **Update security rules** for production (if needed)
5. ✅ **Add email verification** (optional)
6. ✅ **Add password reset** (optional)

## Security Notes

⚠️ **Important for Production**:

1. **Update Firestore Rules** - Test mode expires in 30 days
2. **Enable Email Verification** - Verify user emails
3. **Set up proper security rules** - Restrict access appropriately
4. **Never commit `.env`** - Keep credentials secret
5. **Use environment-specific configs** - Different configs for dev/prod

## Need Help?

- Check browser console for error messages
- Check Firebase Console → Firestore → Data tab
- Verify all environment variables in `.env`
- Ensure dev server was restarted after `.env` changes
