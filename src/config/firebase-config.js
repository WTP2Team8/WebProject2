// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpVJTYSPsasIscy5bJd0BhwqjqEcGiE1g",
  authDomain: "test-366d4.firebaseapp.com",
  projectId: "test-366d4",
  storageBucket: "test-366d4.appspot.com",
  messagingSenderId: "54785880036",
  appId: "1:54785880036:web:7d5c366fd281e8fe2021f1",
  databaseURL:
    "https://test-366d4-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const firestore = getFirestore(app);

