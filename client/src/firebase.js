// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJXpwDJLtOZ4ijCrOgT49cAEwAaynUj2k",
  authDomain: "prephelp-99147.firebaseapp.com",
  projectId: "prephelp-99147",
  storageBucket: "prephelp-99147.appspot.com",
  messagingSenderId: "638347781088",
  appId: "1:638347781088:web:11b548216c9626b6d84185",
  measurementId: "G-ZZL4TE0FV9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db };
export default app;