import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const partition2FirebaseConfig = {
  apiKey: "AIzaSyBF5MYE-mI4flNtpQQ0xFniqgIeJbR8h2w",
  authDomain: "aizawlpartition2.firebaseapp.com",
  databaseURL:
    "https://aizawlpartition2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aizawlpartition2",
  storageBucket: "aizawlpartition2.firebasestorage.app",
  messagingSenderId: "338759419313",
  appId: "1:338759419313:web:65170901d9d3263819e990",
  measurementId: "G-D43E4C5K4C",
};

const partition2App = initializeApp(partition2FirebaseConfig, {
  name: "PARTITION2_APP",
});
export const partition2Db = getDatabase(partition2App);
export default { partition2App, partition2Db };
