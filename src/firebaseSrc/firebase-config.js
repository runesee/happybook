// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from  "firebase/auth"
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIkZKs_7tQcv-34ieuoNT89mShnfY2jK4",
  authDomain: "tdt4140-21318.firebaseapp.com",
  projectId: "tdt4140-21318",
  storageBucket: "tdt4140-21318.appspot.com",
  messagingSenderId: "264605480919",
  appId: "1:264605480919:web:b9a56da3ba65f014277d92",
  measurementId: "G-XKH6SFM3H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);