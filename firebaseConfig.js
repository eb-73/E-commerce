// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXusjiogfGRDEJqg3dKzktjOwTXszqPZE",
  authDomain: "e-commerce-4b1ad.firebaseapp.com",
  projectId: "e-commerce-4b1ad",
  storageBucket: "e-commerce-4b1ad.appspot.com",
  messagingSenderId: "941012263331",
  appId: "1:941012263331:web:e694793dbf7047cd1aba16",
  measurementId: "G-XEDGTZCWEG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, db };
