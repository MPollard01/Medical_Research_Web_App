import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebaseconfig here
const firebaseConfig = {
  apiKey: "AIzaSyA72RdB4Bmx2iCoaxAWQhx2EzAgF9PnKfM",
  authDomain: "cardiomyopathy-platform-66011.firebaseapp.com",
  projectId: "cardiomyopathy-platform-66011",
  storageBucket: "cardiomyopathy-platform-66011.appspot.com",
  messagingSenderId: "398481339102",
  appId: "1:398481339102:web:e1ff3c020923a6ec3f084f",
  measurementId: "G-Z2SJ66MMJG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firebaseAuthentication = firebase.auth();
const firebaseFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firebaseAuthentication, firebaseFireStore, timestamp };
