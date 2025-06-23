import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "user",
      createdAt: new Date().toISOString(),
    })

    return { user, error: null }
  } catch (error) {
    return { user: null, error: error.message }
  }
}

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error) {
    return { user: null, error: error.message }
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return { ...userDoc.data(), id: userDoc.id }
    }
    return null
  } catch (error) {
    console.error("Error getting user data:", error)
    return null
  }
}

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}
