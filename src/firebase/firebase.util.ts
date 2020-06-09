import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyBYa3NtwoVWk8Zasi6VC6j4wFhVDNnP-R0',
    authDomain: 'hospital-finder-a78ad.firebaseapp.com',
    databaseURL: 'https://hospital-finder-a78ad.firebaseio.com',
    projectId: 'hospital-finder-a78ad',
    storageBucket: 'hospital-finder-a78ad.appspot.com',
    messagingSenderId: '671051561063',
    appId: '1:671051561063:web:161fbc74b7a136e7467cc2',
    measurementId: 'G-M9KKL4CG0K',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
