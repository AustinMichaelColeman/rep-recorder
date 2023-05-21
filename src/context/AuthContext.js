"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      // Initialize Firebase app check with reCAPTCHA
      const appCheck = initializeAppCheck(firebase_app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_CAPTCHA_ID),
        isTokenAutoRefreshEnabled: true,
      });
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
          setUser(user);
        } else {
          setUser(null);
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
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
