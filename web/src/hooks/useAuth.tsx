import React, { createContext, useContext, useEffect, useState } from "react";
import { onIdTokenChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { AppUser, Role } from "../types";
import { logout as apiLogout } from "../services/authApi";

import { mockStore } from "../lib/mockStore";

const isDemo = import.meta.env.VITE_DEMO_MODE === "true";

interface AuthContextValue {
  firebaseUser: User | null;
  appUser: AppUser | null;
  role: Role | null;
  isApproved: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  switchUser?: (uid: string) => void;
}

const AuthContext = createContext<AuthContextValue>({
  firebaseUser: null,
  appUser: null,
  role: null,
  isApproved: false,
  loading: true,
  logout: async () => {},
});

const THIRTY_DAYS_SEC = 30 * 24 * 60 * 60;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isDemo) {
      const updateFromMock = () => {
        const u = mockStore.getCurrentUser();
        if (u) {
          setFirebaseUser({ uid: u.uid, email: u.email } as any);
          setAppUser(u);
          setRole(u.role);
          setIsApproved(u.status === "Approved");
        } else {
          setFirebaseUser(null);
          setAppUser(null);
          setRole(null);
          setIsApproved(false);
        }
        setLoading(false);
      };

      updateFromMock();
      const unsub = mockStore.subscribe(updateFromMock);
      return () => unsub();
    }

    let unsubscribeUserDoc: (() => void) | null = null;

    const unsubscribeAuth = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setFirebaseUser(null);
        setAppUser(null);
        setRole(null);
        setIsApproved(false);
        setLoading(false);
        if (unsubscribeUserDoc) unsubscribeUserDoc();
        return;
      }

      // Check 30-day session freshness
      const idTokenResult = await user.getIdTokenResult();
      const authTime = Math.floor(new Date(idTokenResult.authTime).getTime() / 1000);
      const nowSec = Math.floor(Date.now() / 1000);

      if (nowSec - authTime > THIRTY_DAYS_SEC) {
        console.warn("Session expired (30 days reached). Signing out.");
        await apiLogout();
        setLoading(false);
        return;
      }

      setFirebaseUser(user);
      const userRole = (idTokenResult.claims.role as Role) || "trainer";
      const approved = Boolean(idTokenResult.claims.approved);
      setRole(userRole);
      setIsApproved(approved);

      // Listen to Firestore profile updates
      if (unsubscribeUserDoc) unsubscribeUserDoc();
      unsubscribeUserDoc = onSnapshot(doc(db, "users", user.uid), (snap) => {
        if (snap.exists()) {
          const profile = { ...snap.data(), uid: snap.id } as AppUser;
          setAppUser(profile);
          setIsApproved(profile.status === "Approved");
          setRole(profile.role);
        }
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
    };
  }, []);

  const logout = async () => {
    if (isDemo) {
      mockStore.setCurrentUser(null);
    } else {
      await apiLogout();
    }
    setFirebaseUser(null);
    setAppUser(null);
    setRole(null);
    setIsApproved(false);
  };

  const switchUser = (uid: string) => {
    if (isDemo) {
      mockStore.setCurrentUser(uid);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        appUser,
        role,
        isApproved,
        loading,
        logout,
        switchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
