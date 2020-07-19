import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    /*
     * Firebase app details
     */
})

const db = firebaseApp.firestore();

export default db;
    