// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClpXMKvhLr3WxQAsxDftheTIOKfQyo_n4",
  authDomain: "inventory-management-app-3c8b6.firebaseapp.com",
  projectId: "inventory-management-app-3c8b6",
  storageBucket: "inventory-management-app-3c8b6.appspot.com",
  messagingSenderId: "803831090656",
  appId: "1:803831090656:web:6ee6521ce10d0118fcef85",
  measurementId: "G-C5R9E0X61D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };