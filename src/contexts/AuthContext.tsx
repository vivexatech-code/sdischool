import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInAnonymously 
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
  login: (email: string, pass: string) => Promise<void>;
  loginAsDemoAdmin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);

          const isTestingAdmin = user.uid === 'V53k6fOgFWPArELGnrkiepNySiO2' || user.email === 'testing@vivexatech.in';

          if (docSnap.exists()) {
            const existingData = docSnap.data() as AdminUser;
            if (isTestingAdmin && existingData.role !== 'super_admin') {
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
              displayName: user.displayName || (isTestingAdmin ? 'Testing Super Admin' : (user.isAnonymous ? 'Demo Super Admin' : 'School Administrator')),
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
            displayName: user.displayName || (user.uid === 'V53k6fOgFWPArELGnrkiepNySiO2' ? 'Testing Super Admin' : 'Administrator'),
            role: 'super_admin',
          });
        }
      } else {
        setAdminProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const loginAsDemoAdmin = async () => {
    const cred = await signInAnonymously(auth);
    const profile: AdminUser = {
      uid: cred.user.uid,
      email: 'director@siddharthaschools.edu.in',
      displayName: 'Sandeep Kumar (Super Admin)',
      role: 'super_admin',
      createdAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'users', cred.user.uid), profile);
    } catch {
      // Ignored if permissions not yet applied
    }
    setAdminProfile(profile);
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    setAdminProfile(null);
  };

  const isSuperAdmin = 
    adminProfile?.role === 'super_admin' || 
    currentUser?.uid === 'V53k6fOgFWPArELGnrkiepNySiO2' ||
    currentUser?.email === 'testing@vivexatech.in' ||
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
        login,
        loginAsDemoAdmin,
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
