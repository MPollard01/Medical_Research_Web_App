import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebaseconfig here
const firebaseConfig = {
  apiKey: "AIzaSyAJNp8NG1nZfK1dq18WzwEIF0sfgvGL4mw",
  authDomain: "cardiomyapothy-blog.firebaseapp.com",
  projectId: "cardiomyapothy-blog",
  storageBucket: "cardiomyapothy-blog.appspot.com",
  messagingSenderId: "292478695937",
  appId: "1:292478695937:web:0e7a302e9e326b8cbb9e00",
  measurementId: "G-2KX5W83KF1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firebaseAuthentication = firebase.auth();
const firebaseFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firebaseAuthentication, firebaseFireStore, timestamp };
