'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthError,
  User as FirebaseUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  Firestore,
} from "firebase/firestore";
import { auth } from "@/lib/firebase";
interface UserProfile {
  uid: string;
  walletAddress: string;
  email: string;
  name?: string;
  role: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    walletAddress: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  signup: (
    walletAddress: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
 const db: Firestore = getFirestore();
  // Load stored user on mount
  useEffect(() => {
    const stored = localStorage.getItem("zenpay_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("zenpay_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Route protection
  useEffect(() => {
    if (!isLoading) {
      const publicRoutes = ["/", "/login", "/signup", "/merchant"];
      if (!user && !publicRoutes.includes(pathname)) {
        router.push("/login");
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = async (
    walletAddress: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Firebase email/password auth
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const fbUser: FirebaseUser = cred.user;
 // Fetch role from Firestore
      const userDoc = await getDoc(doc(db, "users", fbUser.uid));
      const data = userDoc.data();
      const role = data?.role || "customer";
      const profile: UserProfile = {
        uid: fbUser.uid,
        walletAddress,
        email: fbUser.email || email,
        name: fbUser.displayName || undefined,
         role,
      };

      setUser(profile);
      localStorage.setItem("zenpay_user", JSON.stringify(profile));

      toast({
        title: "Login Successful",
        description: "Welcome back to ZenPay!",
      });

      return true;
    } catch (err: any) {
      const message = (err as AuthError).message || "Login failed";
      toast({
        title: "Login Error",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    walletAddress: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Firebase sign-up
      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const fbUser: FirebaseUser = cred.user;
 // Set default role = "customer" in Firestore
      await setDoc(doc(db, "users", fbUser.uid), {
        role: "customer",
        createdAt: new Date().toISOString(),
      });

      const profile: UserProfile = {
        uid: fbUser.uid,
        walletAddress,
        email: fbUser.email || email,
        name: fbUser.displayName || undefined,
        role: "customer",
      };

      setUser(profile);
      localStorage.setItem("zenpay_user", JSON.stringify(profile));

      toast({
        title: "Signup Successful",
        description: "Your account has been created.",
      });

      return true;
    } catch (err: any) {
      const message = (err as AuthError).message || "Signup failed";
      toast({
        title: "Signup Error",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zenpay_user");
    router.push("/");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem("zenpay_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
}
