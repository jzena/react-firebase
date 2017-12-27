import * as firebase from 'firebase';

// Initialize Firebase
// const config = {
//     apiKey: "AIzaSyCfGksHS2BpYH6BXrqznpZWMlAwzrmtttU",
//     authDomain: "reactfirebase-b16aa.firebaseapp.com",
//     databaseURL: "https://reactfirebase-b16aa.firebaseio.com",
//     projectId: "reactfirebase-b16aa",
//     storageBucket: "reactfirebase-b16aa.appspot.com",
//     messagingSenderId: "113538498979"
// };
var config = {
    apiKey: "AIzaSyBoNue2WFHmt1rZQIe65eXPtnirKC7dD2g",
    authDomain: "elearningreact.firebaseapp.com",
    databaseURL: "https://elearningreact.firebaseio.com",
    projectId: "elearningreact",
    storageBucket: "elearningreact.appspot.com",
    messagingSenderId: "230976406192"
};
firebase.initializeApp(config);

export const storage = firebase.storage();

export default firebase;