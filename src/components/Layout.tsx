import { initializeApp } from "firebase/app";
import "firebase/auth";
import type { Auth, User } from "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import type { ReactNode } from "react";
import React, { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./Navbar";

// Initialize Firebase
initializeApp({
  apiKey: "AIzaSyDxJmO6hhwzxiq5y02M9wLq62pC_uUhWdw",
  authDomain: "projectsf28.firebaseapp.com",
  projectId: "projectsf28",
  storageBucket: "projectsf28.appspot.com",
  messagingSenderId: "396880236",
  appId: "1:396880236:web:fe23047a9e127fedee6b49",
  measurementId: "G-DPP2RQTK03",
});
// const analytics = getAnalytics(app);
// const firestore = getFirestore();

const queryClient = new QueryClient();
export const AuthContext = createContext<{
  auth: Auth | undefined;
  user: User | undefined | null;
}>({
  auth: undefined,
  user: undefined,
});
const auth = getAuth();

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user] = useAuthState(auth);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ auth, user }}>
        <Navbar />
        <main className="mt-16 flex min-h-screen flex-col items-center justify-center overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          {children}
        </main>
        {/* <Footer /> */}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};
