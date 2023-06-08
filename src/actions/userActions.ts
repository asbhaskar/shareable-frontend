import {arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {firestore} from "../firebase";
import {User, USERS_COLLECTION} from "@interfaces/user";

export const getUser = async (userId: string): Promise<User> => {
    try {
        const userIdDocument = await getDoc(doc(firestore, USERS_COLLECTION, userId));
        if (userIdDocument.exists()) {
            return userIdDocument.data() as User
        } else {
            console.log("Error - FireStore - Getting User: No user found for id: " + userId)
            throw new Error();
        }
    } catch (error: unknown) {
        console.log("Error - FireStore - Getting User: ", error);
        throw error
    }
}

export const addUserToGroup = async (userId: string, groupName: string) => {
    try {
        await updateDoc(doc(firestore, USERS_COLLECTION, userId), {
            groupsIds: arrayUnion(groupName)
        });
    } catch (error: unknown) {
        console.log("Error - FireStore - Adding user to group: ", error);
        throw error
    }
}

export const removeUserFromGroup = async (userId: string, groupName: string) => {
    try {
        await updateDoc(doc(firestore, USERS_COLLECTION, userId), {
            groupsIds: arrayRemove(groupName)
        });
    } catch (error: unknown) {
        console.log("Error - FireStore - Removing user from group: ", error);
        throw error
    }
}