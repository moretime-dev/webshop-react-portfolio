// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "webshop-react-c61f3.firebaseapp.com",
  projectId: "webshop-react-c61f3",
  storageBucket: "webshop-react-c61f3.appspot.com",
  messagingSenderId: "695133586858",
  appId: "1:695133586858:web:f16885d4cfca990fd217d3",
  measurementId: "G-4E93DW5L5C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
