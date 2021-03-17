import app from 'firebase/app';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAPeJvMtx3G3ksRCR-X-azpp4xkJ1Ejh9o",
    authDomain: "job-listing-c2bdd.firebaseapp.com",
    databaseURL: "https://job-listing-c2bdd.firebaseio.com",
    projectId: "job-listing-c2bdd",
    storageBucket: "job-listing-c2bdd.appspot.com",
    messagingSenderId: "207489698869",
    appId: "1:207489698869:web:5cca8e9fb71476e897b57c"
  };
  // Initialize Firebase
  const firebase =app.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();

  export {firebase,firestore,app}