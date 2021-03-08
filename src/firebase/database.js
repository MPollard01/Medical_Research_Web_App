import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4ezGZgL9BlKP8i625k0OvRAp3a_S_PAg",
  authDomain: "cardiomyopathydb.firebaseapp.com",
  projectId: "cardiomyopathydb",
  storageBucket: "cardiomyopathydb.appspot.com",
  messagingSenderId: "467129345113",
  appId: "1:467129345113:web:bae0d19967e9dcf8753d48"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firebaseAuthentication = firebase.auth();
const firebaseFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firebaseAuthentication, firebaseFireStore, timestamp };
