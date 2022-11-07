// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8HuACeHOAwls3vj1S22mlCKtNR6ZN49Y",
  authDomain: "whatsaap-clone-v2.firebaseapp.com",
  projectId: "whatsaap-clone-v2",
  storageBucket: "whatsaap-clone-v2.appspot.com",
  messagingSenderId: "594333003554",
  appId: "1:594333003554:web:737f49162180f1800ebf7b"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { db, auth, provider }