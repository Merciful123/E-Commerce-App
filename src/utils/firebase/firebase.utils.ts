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
  User,
  NextOrObserver,
  UserCredential,
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
  QueryDocumentSnapshot,
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

type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

type CategoryData = {
  imageUrl: string;
  items: CategoryItem[];
  title: string;
};

export const getCategoriesAndDocuments = async (): Promise<CategoryData[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapShot) => docSnapShot.data() as CategoryData
  );
};

export type AdditionalInformation = {
  DisplayName?: string;
  // Email?: string;
};

export type UserData = {
  createdAt: Date;
  DisplayName: string;
  Email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: any,
  // remember to clear it that when userAuth was (userAuth:User ) it didn't work.
  // I had to do it (userAuth: any)
  additionalInformation: AdditionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
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
      console.log("error creating the user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  Email: string,
  Password: string
): Promise<UserCredential | void> => {
  if (!Email || !Password) return;
  return await createUserWithEmailAndPassword(auth, Email, Password);
};

export const signInAuthUserWithEmailAndPassword = async (
  Email: string,
  Password: string
): Promise<UserCredential | void> => {
  if (!Email || !Password) return;
  return await signInWithEmailAndPassword(auth, Email, Password);
};

export const signOutUser = async (): Promise<void> => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

/* 
  next:-- callback
  error:-- errocallbcak
  complete :-- completedback
  
  */
