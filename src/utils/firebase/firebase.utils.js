import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
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

//  From here I started storing my data in firebase...

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
 
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { DisplayName, Email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        DisplayName,
        Email,
        createdAt,
        ...additionalInformation,
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

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

/* 
  next:-- callback
  error:-- errocallbcak
  complete :-- completedback
  
  */
