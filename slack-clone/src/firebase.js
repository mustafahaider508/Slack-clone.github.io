 import firebase from "firebase";

 const firebaseConfig = {
  apiKey: "AIzaSyBTab6ChhKj0qYj8_uTQWbG7-m1Hr9R2vY",
  authDomain: "slack-clone-485ec.firebaseapp.com",
  projectId: "slack-clone-485ec",
  storageBucket: "slack-clone-485ec.appspot.com",
  messagingSenderId: "278171280055",
  appId: "1:278171280055:web:5f6c6913b94841f868a332",
  measurementId: "G-8JH3YLLJH0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth= firebase.auth();
const provider =new firebase.auth.GoogleAuthProvider();

export {auth,db,provider}