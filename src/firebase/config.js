import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAtl9BM0zmdu7Ts52tw3lPb5zwjJPtPcbU",
  authDomain: "shopbudget-620d0.firebaseapp.com",
  projectId: "shopbudget-620d0",
  storageBucket: "shopbudget-620d0.firebasestorage.app",
  messagingSenderId: "278937425535",
  appId: "1:278937425535:web:a5020c6b2b4b08164a514a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
