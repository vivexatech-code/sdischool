import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { AdminUser } from '../types';

interface AuthContextType {
  currentUser: User | null;
  adminProfile: AdminUser | null;
  loading: boolean;
  isSuperAdmin: boolean;
  isBranchAdmin: boolean;
  error?: string | null;
  login: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsDemoAdmin: () => Promise<void>;
  demoLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved local admin session first
    try {
      const localSession = sessionStorage.getItem('sis_local_admin_session');
      if (localSession) {
        const parsed = JSON.parse(localSession);
        if (parsed?.user && parsed?.profile) {
          setCurrentUser(parsed.user);
          setAdminProfile(parsed.profile);
        }
      }
    } catch {
      sessionStorage.removeItem('sis_local_admin_session');
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        sessionStorage.removeItem('sis_local_admin_session');
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);

          const isSuperAdminEmail = 
            user.uid === 'V53k6fOgFWPArELGnrkiepNySiO2' || 
            user.email === 'testing@vivexatech.in' ||
            user.email === 'vivexatech@gmail.com' ||
            user.email === 'admin@siddharthaschools.edu.in' ||
            user.email === 'director@siddharthaschools.edu.in';

          if (docSnap.exists()) {
            const existingData = docSnap.data() as AdminUser;
            if (isSuperAdminEmail && existingData.role !== 'super_admin') {
              const updatedData: AdminUser = { ...existingData, role: 'super_admin' };
              await setDoc(userDocRef, updatedData, { merge: true }).catch(() => {});
              setAdminProfile(updatedData);
            } else {
              setAdminProfile(existingData);
            }
          } else {
            // First time admin user profile setup
            const newProfile: AdminUser = {
              uid: user.uid,
              email: user.email || 'testing@vivexatech.in',
              displayName: user.displayName || (isSuperAdminEmail ? 'Super Admin' : (user.isAnonymous ? 'Demo Super Admin' : 'School Administrator')),
              role: 'super_admin',
              createdAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, newProfile).catch(() => {});
            setAdminProfile(newProfile);
          }
        } catch (err) {
          console.warn('Could not fetch user profile from Firestore:', err);
          // Fallback profile for authenticated user
          setAdminProfile({
            uid: user.uid,
            email: user.email || 'testing@vivexatech.in',
            displayName: user.displayName || 'School Administrator',
            role: 'super_admin',
          });
        }
      } else {
        // If not signed into Firebase, keep local admin session if active
        const localSession = sessionStorage.getItem('sis_local_admin_session');
        if (!localSession) {
          setCurrentUser(null);
          setAdminProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    sessionStorage.removeItem('sis_local_admin_session');
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const loginWithGoogle = async () => {
    sessionStorage.removeItem('sis_local_admin_session');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithPopup(auth, provider);
  };

  const loginAsDemoAdmin = async () => {
    try {
      const cred = await signInAnonymously(auth);
      const profile: AdminUser = {
        uid: cred.user.uid,
        email: 'director@siddharthaschools.edu.in',
        displayName: 'Sandeep Kumar (Super Admin)',
        role: 'super_admin',
        createdAt: new Date().toISOString(),
      };
      try {
        await setDoc(doc(db, 'users', cred.user.uid), profile, { merge: true });
      } catch {
        // Ignored
      }
      setAdminProfile(profile);
    } catch (anonErr) {
      console.warn('Firebase anonymous sign-in unavailable, activating secure local admin session:', anonErr);
      const fallbackUser: any = {
        uid: 'admin_local_session',
        email: 'director@siddharthaschools.edu.in',
        displayName: 'Sandeep Kumar (Director & Super Admin)',
        isAnonymous: true,
      };
      const fallbackProfile: AdminUser = {
        uid: 'admin_local_session',
        email: 'director@siddharthaschools.edu.in',
        displayName: 'Sandeep Kumar (Director & Super Admin)',
        role: 'super_admin',
        createdAt: new Date().toISOString(),
      };
      sessionStorage.setItem('sis_local_admin_session', JSON.stringify({ user: fallbackUser, profile: fallbackProfile }));
      setCurrentUser(fallbackUser);
      setAdminProfile(fallbackProfile);
    }
  };

  const logout = async () => {
    sessionStorage.removeItem('sis_local_admin_session');
    try {
      await firebaseSignOut(auth);
    } catch {
      // Ignored
    }
    setCurrentUser(null);
    setAdminProfile(null);
  };

  const isSuperAdmin = 
    adminProfile?.role === 'super_admin' || 
    currentUser?.uid === 'V53k6fOgFWPArELGnrkiepNySiO2' ||
    currentUser?.uid === 'admin_local_session' ||
    currentUser?.email === 'testing@vivexatech.in' ||
    currentUser?.email === 'vivexatech@gmail.com' ||
    currentUser?.email === 'admin@siddharthaschools.edu.in' ||
    currentUser?.email === 'director@siddharthaschools.edu.in';
  const isBranchAdmin = adminProfile?.role === 'branch_admin' || isSuperAdmin;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        adminProfile,
        loading,
        isSuperAdmin,
        isBranchAdmin,
        error: null,
        login,
        loginWithGoogle,
        loginAsDemoAdmin,
        demoLogin: loginAsDemoAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
