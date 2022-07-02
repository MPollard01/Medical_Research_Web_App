import firebase from "firebase/app";
import "firebase/auth";
import { firebaseAuthentication, firebaseFireStore } from "@/firebase/database";

const register = async (info) => {
  let user;
  let error;

  try {
    const response = await firebaseAuthentication.createUserWithEmailAndPassword(
      info.email,
      info.password
    );
    user = response.user;

    await user.updateProfile({
      displayName: info.name,
      phoneNumber: info.phoneNumber,
    });

    user.value = firebase.auth().currentUser;

    const userInfo = {
      email: info.email,
      name: info.name,
      address: info.address,
      phoneNumber: info.phoneNumber,
      institution: info.institution,
    };

    firebaseFireStore
      .collection("users")
      .doc(user.value.uid)
      .set(userInfo);

    const domain = "https://" + firebase.remoteConfig().app.options.authDomain;

    const actionCodeSettings = {
      url: domain + "/login",
    };

    await user.sendEmailVerification(actionCodeSettings);
  } catch (err) {
    error = err.message;
  }

  return {
    user,
    error,
  };
};

const login = async (info) => {
  let user;
  let error;

  try {
    const response = await firebaseAuthentication.signInWithEmailAndPassword(
      info.email,
      info.password
    );
    user = response.user;
  } catch (err) {
    error = err.message;
  }

  return {
    user,
    error,
  };
};

const getCurrentUser = async () => {
  firebaseAuthentication.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebaseAuthentication.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };

  const response = await firebaseAuthentication.getCurrentUser();
  return response;
};

export default {
  register,
  login,
  getCurrentUser,
};
