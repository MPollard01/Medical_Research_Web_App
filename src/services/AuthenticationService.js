import firebase from "firebase";
import { firebaseAuthentication } from "@/firebase/database";

const register = async (info) => {
  let user;
  let errors;

  try {
    const response = await firebaseAuthentication.createUserWithEmailAndPassword(
      info.email,
      info.password
    );
    const user = response.user;
    await user.updateProfile({
      name: info.name,
      address: info.address,
      phoneNumber: info.phoneNumber,
      institution: info.institution,
    });

    const domain = "https://" + firebase.remoteConfig().app.options.authDomain;

    const actionCodeSettings = {
      url: domain + "/login",
    };

    await user.sendEmailVerification(actionCodeSettings);
  } catch (err) {
    errors = err.message;
  }

  return {
    user,
    errors,
  };
};

const login = async (info) => {
  let user;
  let errors;

  try {
    const response = await firebaseAuthentication.signInWithEmailAndPassword(
      info.email,
      info.password
    );
    user = response.user;
  } catch (err) {
    errors = err.message;
  }

  return {
    user,
    errors,
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
