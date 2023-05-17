import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDbCAC8q-3m-VVcJuCStHi-PUiZTm3b_NE",
    authDomain: "vocab-app-dev-fddb3.firebaseapp.com",
    projectId: "vocab-app-dev-fddb3",
    storageBucket: "vocab-app-dev-fddb3.appspot.com",
    messagingSenderId: "615425002204",
    appId: "1:615425002204:web:1dea374083e0dfeea0c219"
};

const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };