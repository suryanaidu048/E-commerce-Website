import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB2fhrFCyldzaYi0fwTPg1MfgZxU7O6e_o",
  authDomain: "e-commerce-website-3cbf3.firebaseapp.com",
  projectId: "e-commerce-website-3cbf3",
  storageBucket: "e-commerce-website-3cbf3.firebasestorage.app",
  messagingSenderId: "902048966011",
  appId: "1:902048966011:web:d441e7511cd83d47dcc9de",
  measurementId: "G-7VDX2QKBP6",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
