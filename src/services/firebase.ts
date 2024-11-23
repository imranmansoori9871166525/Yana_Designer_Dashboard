import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN_KEY,
  projectId: import.meta.env.VITE_PRODUCT_ID_KEY,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_KEY,
  messagingSenderId: "427149364047",
  appId: import.meta.env.VITE_ID_KEY,
  measurementId: "G-9YFCZYCJ68",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
