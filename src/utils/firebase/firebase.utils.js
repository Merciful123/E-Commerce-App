import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAmQRhaYR4HNUPTCcziCc25MuTDLDuHUL4",
  authDomain: "clothingstore-79443.firebaseapp.com",
  projectId: "clothingstore-79443",
  storageBucket: "clothingstore-79443.appspot.com",
  messagingSenderId: "542591896290",
  appId: "1:542591896290:web:80765bbbfad6518121acbb",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  promt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, Email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        Email,
        createdAt,
        additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (Email, Password) => {
  if (!Email || !Password) return;
  return await createUserWithEmailAndPassword(auth, Email, Password);
};

export const signInAuthUserWithEmailAndPassword = async (Email, Password) => {
  if (!Email || !Password) return;
  return await signInWithEmailAndPassword(auth, Email, Password);
};
