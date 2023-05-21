"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

let auth;
try {
  auth = getAuth(firebase_app);
} catch (error) {
  auth = null;
  console.error(
    "Firebase couldn't be initialized. Please check your Firebase credentials."
  );
}

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setEmailVerified(user.emailVerified);
        } else {
          setUser(null);
          setEmailVerified(false);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  if (!auth) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 max-w-md mx-auto bg-white rounded shadow-lg">
          <h1 className="text-xl font-semibold mb-4">
            Rep Recorder - Site Down
          </h1>
          <p className="text-red-500">
            Rep Recorder is offline right now. Check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, emailVerified }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
