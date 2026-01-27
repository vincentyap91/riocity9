# Firebase Quick Setup Guide 🚀

## Your Current Configuration

✅ **Firebase credentials are already in `.env` file**
- Project ID: `riocity9-51db7`
- All environment variables are configured

## Setup Steps (5 minutes)

### Step 1: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **riocity9-51db7**
3. Click **"Authentication"** in the left sidebar
4. Click **"Get started"** (if you see this button)
5. Go to **"Sign-in method"** tab
6. Click on **"Email/Password"**
7. **Toggle ON** "Email/Password" (Enable)
8. Click **"Save"**

✅ **Done!** Authentication is now enabled.

---

### Step 2: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** (left sidebar)
2. Click **"Create database"** button
3. Choose **"Start in test mode"** (for development)
   - This allows read/write for 30 days
4. Select a **location** (choose the closest to your users, e.g., `us-central1`, `asia-southeast1`)
5. Click **"Enable"**
6. Wait ~1 minute for database creation

✅ **Done!** Firestore is now enabled.

---

### Step 3: Set Up Security Rules

1. In Firestore Database, click the **"Rules"** tab
2. Replace the default rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"** button

✅ **Done!** Security rules are set.

---

### Step 4: Restart Dev Server

```bash
# Stop your current dev server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

**Why?** Environment variables are loaded when the server starts.

---

### Step 5: Test It!

#### Test Registration:
1. Open your app: `http://localhost:5173/register`
2. Fill the form:
   - Username: `testuser`
   - Mobile: `1234567890`
   - Password: `password123`
   - Country: Select any
3. Click **"Sign Up"**
4. ✅ Should redirect to home page

#### Verify in Firebase:
1. Go to Firebase Console → **Firestore Database** → **Data** tab
2. You should see a `users` collection
3. Click on it → See your registered user!

#### Test Login:
1. Go to `/login`
2. Enter: `testuser` / `password123`
3. ✅ Should login successfully

---

## Quick Verification Checklist

- [ ] Firebase Authentication → Email/Password is **Enabled**
- [ ] Firestore Database is **Created** and **Enabled**
- [ ] Security Rules are **Published**
- [ ] Dev server **restarted** after `.env` setup
- [ ] Test registration **works**
- [ ] User appears in **Firestore** `users` collection
- [ ] Test login **works**

---

## What Happens When Users Register?

1. **Firebase Auth** creates the user account
2. **Firestore** saves user data to `users` collection:
   ```json
   {
     "uid": "firebase_auth_uid",
     "username": "testuser",
     "email": "testuser@riocity9.com",
     "mobile": "1234567890",
     "countryCode": "+60",
     "createdAt": "Timestamp",
     "updatedAt": "Timestamp"
   }
   ```
3. User is **automatically logged in**
4. Session **persists** across browser restarts

---

## View Your Users

**In Firebase Console:**
1. Go to **Firestore Database** → **Data** tab
2. Click on **`users`** collection
3. See all registered users with their data

**In Browser Console:**
```javascript
// Check if user is logged in
console.log(localStorage.getItem('firebase:authUser:...'))
```

---

## Troubleshooting

### ❌ "Firebase configuration is incomplete"
**Solution:**
- Check `.env` file exists in project root
- Verify all 7 variables are set (no empty values)
- Restart dev server

### ❌ "Permission denied" error
**Solution:**
- Go to Firestore → Rules tab
- Verify rules are published (not just saved)
- Check rules match the code above

### ❌ "Email/Password sign-up is not enabled"
**Solution:**
- Go to Authentication → Sign-in method
- Enable Email/Password
- Click Save

### ❌ Users not appearing in Firestore
**Solution:**
- Check browser console for errors
- Verify Firestore is enabled (not just created)
- Check network tab for failed requests
- Ensure you're in the correct Firebase project

---

## You're All Set! 🎉

Once you complete these 5 steps, your app will:
- ✅ Save all registered users to Firestore
- ✅ Authenticate users securely
- ✅ Persist login sessions
- ✅ Store user data in the cloud

**Next**: Test registration and login, then check Firebase Console to see your users!
