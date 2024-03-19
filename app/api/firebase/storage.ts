// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2vVrPUVnmMm5lCqV-QtYJS8saFvbT2cI",
  authDomain: "blog-22a22.firebaseapp.com",
  projectId: "blog-22a22",
  storageBucket: "blog-22a22.appspot.com",
  messagingSenderId: "863790214518",
  appId: "1:863790214518:web:4ac0a22bc91304c43d9e57",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


