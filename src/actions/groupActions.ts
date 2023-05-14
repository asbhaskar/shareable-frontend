import { firestore } from '../firebase'
import {v4 as uuidv4} from "uuid";
import {
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
    setDoc,
    collection,
    query,
    getDocs
} from "firebase/firestore";
import {Group, GROUPS_COLLECTION} from "../../interfaces/group";
import {ORGANIZATIONS_COLLECTION} from "../../interfaces/organization";
import {CollectionReference, Query} from "@firebase/firestore";

export const addGroup = (organizationId: string, group: Group) => {
    const uuid = uuidv4()

    setDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organizationId}/${GROUPS_COLLECTION}`, uuid), group)
        .catch((error) => {
            console.log("Error - FireStore - Adding Group: ", error);
        });
}

export const getGroup = (organizationId: string, groupId: string): Group | null => {
    getDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organizationId}/${GROUPS_COLLECTION}`, groupId))
        .then((documentSnapshot) => {
            return documentSnapshot.data() as Group
        })
        .catch((error) => {
            console.log("Error - FireStore - Getting Group: ", error);
        });
    return null;
}

export const getGroups = (organizationId: string): Map<string, Group> => {
    const organizationRef: CollectionReference =
        collection(firestore, `${ORGANIZATIONS_COLLECTION}/${organizationId}/${GROUPS_COLLECTION}`);
    const queryRequest: Query = query(organizationRef);

    const groups: Map<string, Group> = new Map<string, Group>();
    getDocs(queryRequest)
        .then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                    groups.set(documentSnapshot.id, documentSnapshot.data() as Group)
                }
            )
        })
        .catch((error) => {
            console.log("Error - FireStore - Querying Groups: ", error);
        });

    return groups;
}

export const addManagerToGroup = (groupId: string, userId: string) => {
    updateDoc(doc(firestore, `${GROUPS_COLLECTION}/${groupId}`), {
        managers: arrayUnion(userId)
    }).catch((error) => {
        console.log("Error - FireStore - Adding manager to group: ", error);
    });
}

export const removeManagerFromGroup = (groupId: string, userId: string) => {
    updateDoc(doc(firestore, `${GROUPS_COLLECTION}/${groupId}`), {
        managers: arrayRemove(userId)
    }).catch((error) => {
        console.log("Error - FireStore - Removing manager from group: ", error);
    });
}