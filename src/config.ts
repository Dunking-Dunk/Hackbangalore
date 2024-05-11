"use client"

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiRotVCKID0A-17Kj7MjlOcmEo5Im6GGc",
  authDomain: "work-manager-19fbb.firebaseapp.com",
  databaseURL: "https://work-manager-19fbb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "work-manager-19fbb",
  storageBucket: "work-manager-19fbb.appspot.com",
  messagingSenderId: "646665103505",
  appId: "1:646665103505:web:f1f29d1c8529d22b8af730",
  measurementId: "G-QR01VTSDT2"
};
console.log('init')
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);


