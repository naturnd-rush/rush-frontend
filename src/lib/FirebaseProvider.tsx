import { createContext, useContext } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseOptions } from "firebase/app";
import { initializeAnalytics, type Analytics } from "firebase/analytics";
import { Database, getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA5ZmTCXd9DcX-1Zkp2YT5ygZuNcOgr3l0",
  authDomain: "rush-v3-prod.firebaseapp.com",
  databaseURL: "https://rush-v3-prod-default-rtdb.firebaseio.com",
  projectId: "rush-v3-prod",
  storageBucket: "rush-v3-prod.firebasestorage.app",
  messagingSenderId: "453797454383",
  appId: "1:453797454383:web:da51a9bf7c7da3b61a1cda",
  measurementId: "G-ZNKEHL9HL5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app === null) {console.log("Firebase did not initialize.")};

type FirebaseContextType = {
  analytics: Analytics | undefined,
  database: Database | undefined,
}

const FirebaseContext = createContext<FirebaseContextType>({ analytics: undefined, database: undefined })

export function FirebaseProvider({ children }: React.PropsWithChildren) {
  // Initialize Analytics without automatic page view on first load, manually sent in '@/app/routes/app/__root.tsx'
  const analytics = initializeAnalytics(app, {config: { send_page_view: 'false' }});
  const database = getDatabase(app);

  return (
    <FirebaseContext.Provider value={{ analytics, database }}>
      { children }
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext)