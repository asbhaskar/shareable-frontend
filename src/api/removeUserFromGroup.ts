import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { USERS_COLLECTION } from '@interfaces/user';

export const removeUserFromGroup = async (userId: string, groupName: string) => {
    try {
        await updateDoc(doc(firestore, USERS_COLLECTION, userId), {
            groupsIds: arrayRemove(groupName),
        });
    } catch (error: unknown) {
        console.log('Error - FireStore - Removing user from group: ', error);
        throw error;
    }
};
