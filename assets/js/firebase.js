// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBGOxxJDonqNavBByhjWDIgyapKud16-KU",
    authDomain: "portfolio-eac55.firebaseapp.com",
    databaseURL: "https://portfolio-eac55.firebaseio.com",
    projectId: "portfolio-eac55",
    storageBucket: "portfolio-eac55.appspot.com",
    messagingSenderId: "407235083661",
    appId: "1:407235083661:web:12e48318997e0dd93ad1c4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
var database = firebase.firestore();

database.collection("users").doc("shivnay").get()
    .then(function(doc){
        console.log(doc);
})