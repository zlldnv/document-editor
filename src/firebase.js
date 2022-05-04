import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMYWnN9qYC5vF91reCR4GpUNrK3NpBEwg",
  authDomain: "document-editor-ec3cb.firebaseapp.com",
  databaseURL:
    "https://document-editor-ec3cb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "document-editor-ec3cb",
  storageBucket: "document-editor-ec3cb.appspot.com",
  messagingSenderId: "1008043573287",
  appId: "1:1008043573287:web:8cf7aeff49acba08a38e02",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
export const firestore = firebase.firestore();

export const reactReduxFirebaseConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};
