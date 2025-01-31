// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzXHEEjPuOkZfDya_me9PmC7VkhtjUYZk",
  authDomain: "uncreative-name.firebaseapp.com",
  projectId: "uncreative-name",
  storageBucket: "uncreative-name.firebasestorage.app",
  messagingSenderId: "633585004258",
  appId: "1:633585004258:web:bc4053097d11cea9a2f8bb",
  measurementId: "G-62S2NWBPK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
