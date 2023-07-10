import { firebaseApp, firestore } from '../firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    // onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { TEST_ORGANIZATION } from '../../interfaces/organization';
import { TEST_GROUP } from '../../interfaces/group';
import { UserCredential } from '@firebase/auth';
import { UserEmailCredentials, USERS_COLLECTION } from '../../interfaces/user';

const auth = getAuth(firebaseApp);

export const signUp = async (userEmailCredentials: UserEmailCredentials) => {
    try {
        const { email, password } = userEmailCredentials;
        const firebaseUserCredential = createUserWithEmailAndPassword(
            auth,
            email,
            password
        ) as unknown as UserCredential;
        const userId: string = firebaseUserCredential.user.uid;
        setDoc(doc(firestore, USERS_COLLECTION, userId), {
            organizationId: [TEST_ORGANIZATION],
            groupsIds: [TEST_GROUP],
        }).then(user => {
            user;
        });
    } catch (error: unknown) {
        console.log(error);
        throw error;
    }
};

export const signIn = async ({ email, password }: UserEmailCredentials) => {
    try {
        return signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
        console.log('API ERROR -> ', typeof error, error);
        throw error;
    }
};

export const signInWithGoogle = async () => {
    try {
        const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
        // todo: lookup type of signInWithPopup response
        const firebaseUserCredential = signInWithPopup(
            auth,
            googleAuthProvider
        ) as unknown as UserCredential;
        return firebaseUserCredential.user;
    } catch (error: unknown) {
        console.log(error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        auth.signOut();
        return true;
    } catch (error: unknown) {
        console.log(error);
        throw error;
    }
};
