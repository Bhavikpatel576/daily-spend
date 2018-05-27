  import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyDStVFKDyDDivxKCGxMilT2GgWhmol6bf0",
    authDomain: "the-daily-spend.firebaseapp.com",
    databaseURL: "https://the-daily-spend.firebaseio.com",
    projectId: "the-daily-spend",
    storageBucket: "the-daily-spend.appspot.com",
    messagingSenderId: "1001111954694"
  };
  firebase.initializeApp(config);
  export default firebase;
