import { useEffect } from "react";
import firebase_app from "@/firebase/config";

export const FirebaseAppCheck = () => {
  useEffect(() => {
    const initializeFirebaseAppCheck = async () => {
      if (firebase_app && process.env.NEXT_PUBLIC_CAPTCHA_ID) {
        const { initializeAppCheck, ReCaptchaV3Provider } = await import(
          "firebase/app-check"
        );

        initializeAppCheck(firebase_app, {
          provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_CAPTCHA_ID),
          isTokenAutoRefreshEnabled: true,
        });
      }
    };

    initializeFirebaseAppCheck();
  }, []);

  return null;
};
