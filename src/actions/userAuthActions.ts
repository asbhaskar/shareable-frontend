import { firebaseApp, firestore } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {TEST_ORGANIZATION} from "../types/organization";
import {TEST_GROUP} from "../types/group";

const auth = getAuth(firebaseApp);

export const signUp = (userCredentials: any) => {
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then((userCredential) => {
           setDoc(doc(firestore, "users", userCredential.user.uid), {
               organizationId: [TEST_ORGANIZATION],
               groupsIds: [TEST_GROUP]
           }).then(() => {

           });
         })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

export const signIn = (userCredentials: any) => {
    signInWithEmailAndPassword(auth, userCredentials.username, userCredentials.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const signInWithGoogle = () => {
    const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
            const user = result.user;
            // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
    });
}

export const signOut = () => {
    auth.signOut().then(()=>{
        console.log("Signed out")
    });
}


