# Firestore User Saving Guide

## ✅ Implementation Complete

All registered users are now automatically saved to Firebase Firestore database.

## How It Works

### 1. **Firestore Initialization**
Firestore is initialized in `src/app/config/firebase.ts`:
```typescript
import { getFirestore } from 'firebase/firestore';
export const db = getFirestore(app);
```

### 2. **User Registration Flow**

When a user registers:
1. **Firebase Authentication** creates the user account
2. **Firestore** saves additional user data to the `users` collection

### 3. **Data Saved to Firestore**

Each registered user is saved with the following data structure:

```typescript
{
  uid: string,              // Firebase Auth UID (unique identifier)
  username: string,          // Username entered during registration
  email: string,            // Email (username@riocity9.com format)
  displayName: string,      // Display name (same as username)
  mobile: string,           // Mobile number (digits only)
  countryCode: string,      // Country code (+60, +61, +63)
  createdAt: Timestamp,     // Server timestamp when registered
  updatedAt: Timestamp,     // Server timestamp when last updated
  agreeTerms: boolean,      // Whether user agreed to terms
  agreeBonus: boolean,      // Whether user wants bonus notifications
}
```

## Database Structure

### Collection: `users`
- **Document ID**: User's Firebase Auth UID
- **Path**: `/users/{uid}`

### Example Document:
```
/users/abc123xyz789
{
  uid: "abc123xyz789",
  username: "john_doe",
  email: "john_doe@riocity9.com",
  displayName: "john_doe",
  mobile: "1234567890",
  countryCode: "+60",
  createdAt: Timestamp(2026-01-24 10:30:00),
  updatedAt: Timestamp(2026-01-24 10:30:00),
  agreeTerms: true,
  agreeBonus: false
}
```

## Code Implementation

### Registration Function (`src/app/contexts/AuthContext.tsx`)

```typescript
const register = async (
  username: string,
  password: string,
  mobile?: string,
  countryCode?: string
): Promise<void> => {
  // 1. Create Firebase Auth user
  const result = await createUserWithEmailAndPassword(auth, email, password);
  
  // 2. Update profile
  await updateProfile(result.user, { displayName: username });
  
  // 3. Save to Firestore
  const userData = {
    uid: result.user.uid,
    username: username,
    email: email,
    displayName: username,
    mobile: mobile || '',
    countryCode: countryCode || '+60',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    agreeTerms: true,
    agreeBonus: false,
  };

  await setDoc(doc(db, 'users', result.user.uid), userData);
};
```

### User Data Retrieval

When a user logs in, the app automatically fetches their data from Firestore:

```typescript
// In onAuthStateChanged listener
const userDocRef = doc(db, 'users', firebaseUser.uid);
const userDocSnap = await getDoc(userDocRef);

if (userDocSnap.exists()) {
  const userData = userDocSnap.data();
  // Use userData.username, userData.mobile, etc.
}
```

## Viewing Users in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database**
4. You'll see the `users` collection
5. Each document represents a registered user

## Security Rules (Recommended)

Add these Firestore security rules to protect user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Users can only read/write their own data
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow read for authenticated users (optional, for admin features)
      // allow read: if request.auth != null;
    }
  }
}
```

To set security rules:
1. Go to Firebase Console → Firestore Database
2. Click on "Rules" tab
3. Paste the rules above
4. Click "Publish"

## Querying Users (Examples)

### Get All Users
```typescript
import { collection, getDocs } from 'firebase/firestore';

const usersRef = collection(db, 'users');
const usersSnapshot = await getDocs(usersRef);
const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

### Get User by Mobile Number
```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';

const usersRef = collection(db, 'users');
const q = query(usersRef, where('mobile', '==', '1234567890'));
const querySnapshot = await getDocs(q);
const users = querySnapshot.docs.map(doc => doc.data());
```

### Get Users by Country Code
```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';

const usersRef = collection(db, 'users');
const q = query(usersRef, where('countryCode', '==', '+60'));
const querySnapshot = await getDocs(q);
const malaysianUsers = querySnapshot.docs.map(doc => doc.data());
```

### Get Recent Users (Last 24 hours)
```typescript
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

const usersRef = collection(db, 'users');
const yesterday = Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
const q = query(usersRef, where('createdAt', '>=', yesterday));
const querySnapshot = await getDocs(q);
const recentUsers = querySnapshot.docs.map(doc => doc.data());
```

## Updating User Data

### Update User Profile
```typescript
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const updateUserProfile = async (uid: string, updates: any) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

// Example usage
await updateUserProfile(user.uid, {
  mobile: '9876543210',
  countryCode: '+61',
});
```

## Best Practices

1. **Always use `serverTimestamp()`** for `createdAt` and `updatedAt` fields
2. **Never store passwords** in Firestore (Firebase Auth handles this)
3. **Use the UID as document ID** for easy lookups
4. **Add Firestore indexes** for queries on `mobile`, `countryCode`, etc.
5. **Set up security rules** to protect user data
6. **Handle errors gracefully** when Firestore operations fail

## Troubleshooting

### Users not appearing in Firestore?
- Check Firebase Console → Firestore Database
- Verify Firestore is enabled in your Firebase project
- Check browser console for errors
- Ensure `serverTimestamp()` is used (not `new Date()`)

### Permission denied errors?
- Set up Firestore security rules (see above)
- Ensure user is authenticated
- Check that rules allow read/write operations

### Data not loading?
- Check network tab in browser DevTools
- Verify Firestore queries are correct
- Ensure user document exists in Firestore

## Next Steps

1. ✅ **Set up Firestore Security Rules** (see above)
2. ✅ **Create Firestore Indexes** for common queries (mobile, countryCode)
3. ✅ **Add user update functionality** in Profile page
4. ✅ **Implement user search/admin features** if needed
5. ✅ **Add data validation** on Firestore write operations

## Additional Resources

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firestore Queries](https://firebase.google.com/docs/firestore/query-data/queries)
