import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCSo1nRkbvdenMURWhy8DOfPeW03FCtTuc',
    authDomain: 'shareable-mvp.firebaseapp.com',
    projectId: 'shareable-mvp',
    storageBucket: 'shareable-mvp.appspot.com',
    messagingSenderId: '416469720705',
    appId: '1:416469720705:web:ff5c14c7cad5d720333780',
    measurementId: 'G-8JTLVNE44B',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export { firebaseApp, firestore, firebaseStorage };
