import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWQNQHd4QwmDQ98h8s6DKIGw5HlEaBA0s",
  authDomain: "selco-kharupetia.firebaseapp.com",
  databaseURL: "https://selco-kharupetia-default-rtdb.firebaseio.com",
  projectId: "selco-kharupetia",
  storageBucket: "selco-kharupetia.firebasestorage.app",
  messagingSenderId: "318256630437",
  appId: "1:318256630437:web:37ba29f879748a831c5b4c",
  measurementId: "G-8G89KNYJJ4",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export default { app, db };
