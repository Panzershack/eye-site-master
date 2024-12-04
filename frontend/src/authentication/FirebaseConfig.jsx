
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyBeu5Vzu_ZmhJebx76GS-U6-YrkXxnPCB0",
  authDomain: "eye-site-master-48b69.firebaseapp.com",
  projectId: "eye-site-master-48b69",
  storageBucket: "eye-site-master-48b69.appspot.com",
  messagingSenderId: "12149843287",
  appId: "1:12149843287:web:20da9b7fd2852c27904a12",
  measurementId: "G-PV7TSTLYVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database =getAuth(app)