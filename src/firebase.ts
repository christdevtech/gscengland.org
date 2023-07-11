// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA91cQ62-F1O6hvFYpNSTte5cmDc66qVYY",
  authDomain: "gsc-england.firebaseapp.com",
  projectId: "gsc-england",
  storageBucket: "gsc-england.appspot.com",
  messagingSenderId: "683799381368",
  appId: "1:683799381368:web:77dc3d5b8f2c9aad0cb48d",
  measurementId: "G-JDYB8SS6RR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
