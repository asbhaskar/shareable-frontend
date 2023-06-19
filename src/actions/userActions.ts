import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../firebase";
import {User, USERS_COLLECTION} from "@interfaces/user";

export const getUser = async (userId: string): Promise<User> => {
    try {
        const userIdDocument = await getDoc(doc(firestore, USERS_COLLECTION, userId));
        if (userIdDocument.exists()) {
            return userIdDocument.data() as User
        }
    } catch (error: unknown) {
        console.log("Error - FireStore - Getting User: ", error);
        throw error
    }
    console.log("Error - FireStore - Getting User: No user found for id: " + userId)
    throw new Error();
}