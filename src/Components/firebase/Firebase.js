import { initializeApp } from "firebase/app";

import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCI9exHbU9DeXm-tbOZhK_WRTXYZqOdbjc",
  authDomain: "filmlyworld-b8d5f.firebaseapp.com",
  projectId: "filmlyworld-b8d5f",
  storageBucket: "filmlyworld-b8d5f.appspot.com",
  messagingSenderId: "1034403105083",
  appId: "1:1034403105083:web:945a082d2c2e8a48500f1e",
  measurementId: "G-V0V4ZE3G5D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const movieRef = collection(db,"movies");
export const reviewsRef = collection(db,"reviews");
export const usersRef = collection(db, "users");

export default app;