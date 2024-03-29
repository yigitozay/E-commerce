import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect,signInWithPopup, GoogleAuthProvider,
   createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import {doc, getFirestore,getDoc, setDoc, collection,writeBatch,query,getDocs} from 'firebase/firestore';

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

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);



export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db,collectionKey);
  console.log(objectsToAdd);
  objectsToAdd.forEach((object)=>{
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'collections');

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, []);

  return categoryMap;
};










export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { Name, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        Name,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password)return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword= async (email, password) => {
  if(!email || !password)return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);