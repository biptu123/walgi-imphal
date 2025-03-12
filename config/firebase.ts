import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDru_CzfWaZhRwMvLI-7Otp01FwbncpwEI",
  authDomain: "smart-agri-f6793.firebaseapp.com",
  databaseURL: "https://smart-agri-f6793-default-rtdb.firebaseio.com",
  projectId: "smart-agri-f6793",
  storageBucket: "smart-agri-f6793.firebasestorage.app",
  messagingSenderId: "370684752249",
  appId: "1:370684752249:web:88985c2c6adeed16093fa8",
  measurementId: "G-CEG0PJRWEX",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export default { app, db };
