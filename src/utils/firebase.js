// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn3jeU-ZWfiZdbThmlmoCzT53PL4rsfFo",
  authDomain: "netflix-gpt-12c56.firebaseapp.com",
  projectId: "netflix-gpt-12c56",
  storageBucket: "netflix-gpt-12c56.appspot.com",
  messagingSenderId: "849124014622",
  appId: "1:849124014622:web:fa3b6e89a3beca35af0c0f",
  measurementId: "G-EN6T0M18S8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
