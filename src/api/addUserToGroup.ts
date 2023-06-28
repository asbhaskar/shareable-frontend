import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {firestore} from "../firebase";
import {USERS_COLLECTION} from "@interfaces/user";

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