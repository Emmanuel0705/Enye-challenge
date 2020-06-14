import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';

import slug from 'slug';

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
export interface userData {
    uid: string;
    email: string;
}

export const createUserDocument = async (userData: userData) => {
    if (!userData) return;
    const userRef = firestore.doc(`users/${userData.uid}`);

    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const createdAt = new Date();

        try {
            await userRef.set({
                email: userData.email,
                createdAt,
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

const convertDataToSnapShot = (data: any) => {
    const res = data.docs.map((doc: any) => {
        return doc.data();
    });
    return res;
};
export const fetchData = async (type: string) => {
    let value: any[] = [];
    const collectR = firestore.collection(type);
    collectR.onSnapshot(async (snapshot) => {
        var data = convertDataToSnapShot(snapshot);
        value.push(
            ...data.filter(
                (val: any) => val.userId === 'FsuuRzJDgkNEGEM3JoX4nVBNS6q2'
            )
        );
        console.log(
            data.filter(
                (val: any) => val.userId === 'FsuuRzJDgkNEGEM3JoX4nVBNS6q2'
            )
        );
    });

    return value;
};

export const addLocation = async (
    type: string,
    userid: string,
    objectToAdd: any[]
) => {
    const collectionRef = firestore.collection(`${type}`);
    const bash = firestore.batch();
    objectToAdd.forEach(async (obj) => {
        const slugId = slug(`${obj.name}-${userid}`);

        const newDocRef = collectionRef.doc(slugId);
        bash.set(newDocRef, obj);
    });
    return await bash.commit();
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
