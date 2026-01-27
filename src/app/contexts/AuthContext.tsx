import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  type User as FirebaseUser,
  type AuthError,
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  type Timestamp 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface User {
  uid: string;
  email?: string;
  displayName?: string;
  username?: string;
  mobile?: string;
  countryCode?: string;
  createdAt?: Date | Timestamp;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, mobile?: string, countryCode?: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure persistence is set
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error('Failed to set persistence:', error);
    });

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Try to fetch user data from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || userData.email || undefined,
              displayName: firebaseUser.displayName || userData.displayName || userData.usernameDisplay || userData.username || undefined,
              username: userData.usernameDisplay || userData.username || undefined,
              mobile: userData.mobile || undefined,
              countryCode: userData.countryCode || undefined,
              createdAt: userData.createdAt || undefined,
            });
          } else {
            // Fallback to basic user data if Firestore doc doesn't exist
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || undefined,
              displayName: firebaseUser.displayName || undefined,
            });
          }
        } catch (error) {
          console.error('Error fetching user data from Firestore:', error);
          // Fallback to basic user data
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || undefined,
            displayName: firebaseUser.displayName || undefined,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    setError(null);
    setLoading(true);

    try {
      if (!username.trim()) {
        throw new Error('Username is required');
      }

      if (!password) {
        throw new Error('Password is required');
      }

      // Convert username to email format for Firebase
      // If username doesn't contain @, treat it as email with default domain
      const email = username.includes('@') ? username : `${username}@riocity9.com`;
      await signInWithEmailAndPassword(auth, email, password);
      // User state will be updated by onAuthStateChanged listener
    } catch (err) {
      const firebaseError = err as AuthError;
      const errorMessage = getErrorMessage(firebaseError.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    password: string,
    mobile?: string,
    countryCode?: string
  ): Promise<void> => {
    setError(null);
    setLoading(true);

    try {
      if (!username.trim()) {
        throw new Error('Username is required');
      }

      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters');
      }

      if (!password) {
        throw new Error('Password is required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Check if username already exists
      const usernameQuery = query(
        collection(db, 'users'),
        where('username', '==', username.trim().toLowerCase())
      );
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        throw new Error('Username already registered');
      }

      // Check if mobile number already exists (if provided)
      if (mobile && mobile.trim()) {
        const mobileQuery = query(
          collection(db, 'users'),
          where('mobile', '==', mobile.trim())
        );
        const mobileSnapshot = await getDocs(mobileQuery);
        if (!mobileSnapshot.empty) {
          throw new Error('Mobile number already registered');
        }
      }

      // Convert username to email format for Firebase
      const email = username.includes('@') ? username : `${username}@riocity9.com`;
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with username as displayName
      await updateProfile(result.user, { displayName: username });
      
      // Save user data to Firestore
      // Store username in lowercase for case-insensitive duplicate checking
      const userData = {
        uid: result.user.uid,
        username: username.trim().toLowerCase(),
        usernameDisplay: username.trim(), // Store original case for display
        email: email,
        displayName: username.trim(),
        mobile: mobile ? mobile.trim() : '',
        countryCode: countryCode || '+60',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        agreeTerms: true,
        agreeBonus: false, // Can be updated later
      };

      // Save to Firestore in 'users' collection
      await setDoc(doc(db, 'users', result.user.uid), userData);
      
      console.log('User registered and saved to Firestore:', result.user.uid);
      
      // User state will be updated by onAuthStateChanged listener
    } catch (error) {
      const firebaseError = error as AuthError;
      const errorMessage = getErrorMessage(firebaseError.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (error) {
      const firebaseError = error as AuthError;
      const errorMessage = getErrorMessage(firebaseError.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper function to convert Firebase error codes to user-friendly messages
function getErrorMessage(errorCode: string): string {
  const errorMessages: { [key: string]: string } = {
    'auth/user-not-found': 'Username or password is incorrect',
    'auth/wrong-password': 'Username or password is incorrect',
    'auth/invalid-email': 'Invalid username format',
    'auth/user-disabled': 'This account has been disabled',
    'auth/email-already-in-use': 'Username already registered',
    'auth/weak-password': 'Password is too weak. Use at least 6 characters',
    'auth/operation-not-allowed': 'Email/password sign-up is not enabled',
    'auth/too-many-requests': 'Too many login attempts. Try again later',
    'auth/network-request-failed': 'Network error. Check your connection',
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again';
}
