import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
             apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
         authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
              appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

/**
 * (NOBRIDGE) WARN  [2025-03-22T06:35:06.030Z]  @firebase/auth: Auth (11.5.0):
 * You are initializing Firebase Auth for React Native without providing
 * AsyncStorage. Auth state will default to memory persistence and will not
 * persist between sessions. In order to persist auth state, install the package
 * "@react-native-async-storage/async-storage" and provide it to initializeAuth:
 * 
 */



