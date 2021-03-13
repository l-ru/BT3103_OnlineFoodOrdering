/* jshint esversion: 6 */
import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //Fill in your firebase details here
  apiKey: "AIzaSyAmlMF132ReUFoCq6ggVZGyY80HcN-qIQk",
  authDomain: "bt3103-week-6-63f39.firebaseapp.com",
  projectId: "bt3103-week-6-63f39",
  storageBucket: "bt3103-week-6-63f39.appspot.com",
  messagingSenderId: "588007843045",
  appId: "1:588007843045:web:f130664c3621c1d1f7200c",
  measurementId: "G-SRJJCFXYYD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
