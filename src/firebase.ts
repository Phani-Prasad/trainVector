import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBaJn0XgVefbU4-ihFDhuKDKf_HccHb7Cs",
  authDomain: "trainvector-ab51b.firebaseapp.com",
  projectId: "trainvector-ab51b",
  storageBucket: "trainvector-ab51b.appspot.com",
  messagingSenderId: "156986364130",
  appId: "1:156986364130:web:b1c8fd9f76a0b3a443cebb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
