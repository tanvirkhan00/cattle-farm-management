import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured, storageHelper } from '../services/firebase';

export type UserRole = 'admin' | 'employee';

export interface FarmUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  phone?: string;
}

interface AuthContextType {
  currentUser: FarmUser | null;
  role: UserRole;
  loading: boolean;
  isFirebaseActive: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signupWithEmail: (email: string, pass: string, name: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchDemoRole: (newRole: UserRole) => void;
}

const DEFAULT_DEMO_USER: FarmUser = {
  uid: 'demo-owner-001',
  email: 'owner@smartcattlefarm.bd',
  displayName: 'Md. Tariqul Islam (Farm Owner)',
  role: 'admin',
  phone: '+880 1712-345678'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FarmUser | null>(() => {
    return storageHelper.get('current_user', DEFAULT_DEMO_USER);
  });
  const [role, setRole] = useState<UserRole>(() => currentUser?.role || 'admin');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return;

    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: User | null) => {
      if (fbUser) {
        try {
          // Fetch user profile from Firestore users collection
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
          let assignedRole: UserRole = 'employee';

          if (userDoc.exists()) {
            assignedRole = userDoc.data().role || 'employee';
          } else {
            // First registered user default to admin if email contains owner/admin
            assignedRole = fbUser.email?.includes('admin') || fbUser.email?.includes('owner') ? 'admin' : 'employee';
            await setDoc(doc(db, 'users', fbUser.uid), {
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: fbUser.displayName || 'Farm User',
              role: assignedRole,
              createdAt: new Date().toISOString()
            });
          }

          const farmUser: FarmUser = {
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || 'Farm User',
            role: assignedRole
          };

          setCurrentUser(farmUser);
          setRole(assignedRole);
          storageHelper.set('current_user', farmUser);
        } catch (e) {
          console.error('Error fetching user profile from Firestore:', e);
        }
      } else {
        // Fallback to local user
        const stored = storageHelper.get('current_user', DEFAULT_DEMO_USER);
        setCurrentUser(stored);
        setRole(stored.role);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured) {
      // Offline/Local Demo Login
      const isOwner = email.toLowerCase().includes('admin') || email.toLowerCase().includes('owner');
      const demoUser: FarmUser = {
        uid: isOwner ? 'demo-owner-001' : 'demo-worker-002',
        email,
        displayName: isOwner ? 'Md. Tariqul Islam (Owner)' : 'Rafiqul Islam (Staff)',
        role: isOwner ? 'admin' : 'employee'
      };
      setCurrentUser(demoUser);
      setRole(demoUser.role);
      storageHelper.set('current_user', demoUser);
      return { success: true };
    }

    try {
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
      const userRole: UserRole = userDoc.exists() ? userDoc.data().role : 'employee';
      setRole(userRole);
      return { success: true };
    } catch (err: any) {
      console.error('Firebase login error:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signupWithEmail = async (
    email: string, 
    pass: string, 
    name: string, 
    userRole: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured) {
      const demoUser: FarmUser = {
        uid: `demo-${Date.now()}`,
        email,
        displayName: name,
        role: userRole
      };
      setCurrentUser(demoUser);
      setRole(userRole);
      storageHelper.set('current_user', demoUser);
      return { success: true };
    }

    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName: name });
      
      // Store user document with role in Firestore
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email,
        displayName: name,
        role: userRole,
        createdAt: new Date().toISOString()
      });

      const farmUser: FarmUser = {
        uid: cred.user.uid,
        email,
        displayName: name,
        role: userRole
      };
      setCurrentUser(farmUser);
      setRole(userRole);
      storageHelper.set('current_user', farmUser);
      return { success: true };
    } catch (err: any) {
      console.error('Firebase signup error:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    // Return to default demo role
    setCurrentUser(DEFAULT_DEMO_USER);
    setRole('admin');
    storageHelper.set('current_user', DEFAULT_DEMO_USER);
  };

  const switchDemoRole = (newRole: UserRole) => {
    const updated: FarmUser = {
      uid: newRole === 'admin' ? 'demo-owner-001' : 'demo-worker-002',
      email: newRole === 'admin' ? 'owner@smartcattlefarm.bd' : 'staff@smartcattlefarm.bd',
      displayName: newRole === 'admin' ? 'Md. Tariqul Islam (Owner)' : 'Rafiqul Islam (Farm Staff)',
      role: newRole
    };
    setCurrentUser(updated);
    setRole(newRole);
    storageHelper.set('current_user', updated);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      role,
      loading,
      isFirebaseActive: isFirebaseConfigured,
      loginWithEmail,
      signupWithEmail,
      logout,
      switchDemoRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
