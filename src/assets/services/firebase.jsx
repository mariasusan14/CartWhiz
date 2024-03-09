import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDxUeu0PIFUQS59irAsBJZ6bus6mNuv16I",
  authDomain: "cartwhiz-6ab09.firebaseapp.com",
  databaseURL: "https://cartwhiz-6ab09-default-rtdb.firebaseio.com",
  projectId: "cartwhiz-6ab09",
  storageBucket: "cartwhiz-6ab09.appspot.com",
  messagingSenderId: "605911142944",
  appId: "1:605911142944:web:64c7dfdacc95fbc0e8e245",
  measurementId: "G-LXXQYB5Y12"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db =getFirestore(app);
export const imgdb=getStorage(app);