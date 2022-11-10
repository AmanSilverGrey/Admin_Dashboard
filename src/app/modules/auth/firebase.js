
import firebase from 'firebase/compat/app';
import 'firebase/auth'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBxJwC7N8Uwc_aTDgQ-WpgQOTYqM0uUj4",
  authDomain: "asc-c54d8.firebaseapp.com",
  databaseURL: "https://asc-c54d8-default-rtdb.firebaseio.com",
  projectId: "asc-c54d8",
  storageBucket: "asc-c54d8.appspot.com",
  messagingSenderId: "32424224002",
  appId: "1:32424224002:web:e73e2ee753f046e4e04e1b"
};

firebase.initializeApp(firebaseConfig)
export default firebase;
