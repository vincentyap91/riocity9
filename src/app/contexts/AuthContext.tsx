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
import { auth } from '../config/firebase';

interface User {
  uid: string;
  email?: string;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, mobile?: string) => Promise<void>;
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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || undefined,
          displayName: firebaseUser.displayName || undefined,
        });
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
    mobile?: string
  ): Promise<void> => {
    setError(null);
    setLoading(true);

    try {
      // Convert username to email format for Firebase
      const email = username.includes('@') ? username : `${username}@riocity9.com`;
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with username as displayName
      await updateProfile(result.user, { displayName: username });
      
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
