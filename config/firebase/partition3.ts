import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const partition3FirebaseConfig = {
  apiKey: "AIzaSyB3UWz-imEEhJ4UAaR-be9jkSwJVuszUf0",
  authDomain: "aizawlpartition3.firebaseapp.com",
  databaseURL:
    "https://aizawlpartition3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aizawlpartition3",
  storageBucket: "aizawlpartition3.firebasestorage.app",
  messagingSenderId: "932089065407",
  appId: "1:932089065407:web:7265ffcc255cc9034abb0a",
  measurementId: "G-DVR3SQ7P56",
};

const partition3App = initializeApp(partition3FirebaseConfig, {
  name: "PARTITION3_APP",
});
export const partition3Db = getDatabase(partition3App);
export default { partition3App, partition3Db };
