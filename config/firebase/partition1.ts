import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const partition1FirebaseConfig = {
  apiKey: "AIzaSyDC6b0OZ0vQ5IB-EmOwvGTwInTumIQs0HE",
  authDomain: "aizawlpartition1.firebaseapp.com",
  databaseURL:
    "https://aizawlpartition1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aizawlpartition1",
  storageBucket: "aizawlpartition1.firebasestorage.app",
  messagingSenderId: "752024062574",
  appId: "1:752024062574:web:a8c1302920b62093e7b47f",
  measurementId: "G-CXLQK2X0R6",
};

const partition1App = initializeApp(partition1FirebaseConfig, {
  name: "PARTITION1_APP",
});
export const partition1Db = getDatabase(partition1App);
export default { partition1App, partition1Db };
