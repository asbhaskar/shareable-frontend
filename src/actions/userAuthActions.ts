import { firebaseApp, firestore } from '../firebase'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { TEST_ORGANIZATION } from '../interfaces/organization'
import { TEST_GROUP } from '../interfaces/group'
import { UserCredential } from '@firebase/auth'
import { UserEmailCredentials, USERS_COLLECTION } from '../interfaces/user'

const auth = getAuth(firebaseApp)

export const signUp = (userEmailCredentials: UserEmailCredentials) => {
    const { email, password } = userEmailCredentials
    createUserWithEmailAndPassword(auth, email, password)
        .then((firebaseUserCredential: UserCredential) => {
            const userId: string = firebaseUserCredential.user.uid
            setDoc(doc(firestore, USERS_COLLECTION, userId), {
                organizationId: [TEST_ORGANIZATION],
                groupsIds: [TEST_GROUP],
            }).then(() => {})
        })
        .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            // ..
        })
}

export const signIn = (userEmailCredentials: UserEmailCredentials) => {
    const { email, password } = userEmailCredentials
    signInWithEmailAndPassword(auth, email, password)
        .then((firebaseUserCredential: UserCredential) => {
            // Signed in
            const user = firebaseUserCredential.user
            // ...
        })
        .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
        })
}

export const signInWithGoogle = () => {
    const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleAuthProvider)
        .then((firebaseUserCredential: UserCredential) => {
            const user = firebaseUserCredential.user
            // ...
        })
        .catch(error => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.customData.email
        })
}

export const signOut = () => {
    auth.signOut().then(() => {
        console.log('Signed out')
    })
}
