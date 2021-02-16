import firebase from "firebase";

const register = async (info) => {
    let user;
    let error;

    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(info.email, info.password)
        const user = response.user;
        await user.updateProfile({
            name: info.name,
            address: info.address,
            phoneNumber: info.phoneNumber,
            institution: info.institution
        });

        const domain = "https://" + firebase.remoteConfig().app.options.authDomain;

        const actionCodeSettings = {
            url: domain + "/login"
        };

        await user.sendEmailVerification(actionCodeSettings);
    } catch(err) {
        error = err.message;
    }
    
    return {
        user,
        error
    }
}

const login = async (info) => {
    let user;
    let error;

    try {
        const response = await firebase.auth().signInWithEmailAndPassword(info.email, info.password);
        user = response.user;
    } catch (err) {
        error = err.message;
    }

    return {
        user,
        error
    }
}

const logout = () => {
    if (firebase.getCurrentUser()) {
        firebase.auth().signOut();
    }
}

const getCurrentUser = async () => {
    firebase.getCurrentUser = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = firebase.auth().onAuthStateChanged(user => {
                unsubscribe();
                resolve(user);
            }, reject);
        })
    };

    const response = await firebase.getCurrentUser();
    return response;
}

export default {
  register,
  login,
  logout,
  getCurrentUser
}