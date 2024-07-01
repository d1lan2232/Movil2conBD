// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD60yh5gyASkjTZNCQso8kkgIGyV_kFLdw",
  authDomain: "app-1-32221.firebaseapp.com",
  databaseURL: "https://app-1-32221-default-rtdb.firebaseio.com",
  projectId: "app-1-32221",
  storageBucket: "app-1-32221.appspot.com",
  messagingSenderId: "16947461777",
  appId: "1:16947461777:web:944c27e9baf87e600b0930"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);