import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect,signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {doc, getFirestore,getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCissUTKLg5zFt-5xNPkiy_IxnWOEv122g",
    authDomain: "e-commercedb-1aa4e.firebaseapp.com",
    projectId: "e-commercedb-1aa4e",
    storageBucket: "e-commercedb-1aa4e.appspot.com",
    messagingSenderId: "765096445470",
    appId: "1:765096445470:web:54e253e1cfa0d9694f500f"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });
export const auth =getAuth();

export const signInWithGooglepopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }
    catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
};