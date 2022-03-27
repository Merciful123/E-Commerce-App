import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  promt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  const { displayName, email } = userAuth;
  const createdAt = new Date();
  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
    });
  } catch (error) {
    console.log("error creating the user".error.message);
    return userDocRef;
  }
};
