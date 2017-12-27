import firebase from '../../api/firebase';
import toastr from 'toastr';

const db = firebase.database().ref("dev");
const provider = new firebase.auth.FacebookAuthProvider();

//login with facebook

function getOrCreateProfile(user, dispatch) {
    const userRef = db.child("users/" + user.uid);
    console.log(userRef)
    return userRef.on("value", s => {
        console.log(s)
        if (!s.val()) {
            const profile = {
                displayName: user.displayName,
                uid: user.uid,
                photoURL: user.photoURL,
                email: user.email
            };
            userRef.set(profile);
            return dispatch(userLoginSuccess(profile))
        } else {
            //console.log(s.val())
            if (s.val().isStaff) localStorage.setItem("isStaff", true);
            return dispatch(userLoginSuccess(s.val()))
        }
    })
}

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";

function userLoginSuccess(profile) {
    return {
        type: USER_LOGIN_SUCCESS,
        profile
    }
}

export const loginWithFacebook = () => (dispatch) => {
    // e.preventDefault();
    return firebase.auth().signInWithPopup(provider)
        .then(result => {
            localStorage.setItem("user", JSON.stringify(result.user));
            getOrCreateProfile(result.user, dispatch);
            return Promise.resolve(result.user);
        })
        .catch(e => {
            console.log(e);
            toastr.error(e.message);
            return Promise.reject(e.message)
        });
};

//login with facebook

//loginWitEmail

export const loginWithEmail = ({ email, password }) => (dispatch) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(s => {
            localStorage.setItem("user", JSON.stringify(s));
            getOrCreateProfile(s, dispatch);
            return Promise.resolve(s);
        })
        .catch(e => {
            console.log(e);
            toastr.error(e.message);
            return Promise.reject(e.message);
        })
};

//loginWitEmail

//Update profile
export const updateProfile = (profile) => (dispatch, getState) => {
    let updates = {};
    const userUid = getState().user.profile.uid;
    updates[`/users/${userUid}`] = profile;
    return db.update(updates)
        .then(() => {
            return Promise.resolve();
        })
        .catch(e => {
            console.log(e);
            return Promise.reject(e.message)
        });
};
//Update profile

//check if user

export const checkIfUser = () => (dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            dispatch(getOrCreateProfile(user, dispatch));
        }
    })
};

//check if user

//logOut

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const logOut = () => (dispatch) => {
    firebase.auth().signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("isStaff");
    dispatch({ type: LOGOUT_SUCCESS })
};

//logOut
