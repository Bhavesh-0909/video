import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCLttOljgdZeEADv5D4MdJdPwi9_FTXg38",
  authDomain: "video-5d0df.firebaseapp.com",
  projectId: "video-5d0df",
  storageBucket: "video-5d0df.appspot.com",
  messagingSenderId: "764166109027",
  appId: "1:764166109027:web:a3f50d0c9c583d6c888556"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);