import { firestore } from '../firebase'
import {FiledRequest, REQUESTS_COLLECTION} from "../../interfaces/filedRequest";
import {v4 as uuidv4} from 'uuid';
import {
    doc,
    setDoc,
    getDocs,
    deleteDoc,
    query,
    orderBy,
    limit,
    collection,
    startAfter,
    getDoc
} from "firebase/firestore";
import {ORGANIZATIONS_COLLECTION} from "../../interfaces/organization";
import {GROUPS_COLLECTION} from "../../interfaces/group";
import {CollectionReference, Query} from "@firebase/firestore";

const QUERY_LIMIT: number = 100

export const addFiledRequest = (organization: string, group: string, filedRequest: FiledRequest) => {
    const uuid: string = uuidv4()

    setDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${REQUESTS_COLLECTION}`, uuid), filedRequest)
        .catch((error) => {
            console.log("Error - FireStore - Adding FiledRequest: ", error);
        });
}

export const updateFiledRequest = (organization: string, group: string, filedRequestId: string, filedRequest: FiledRequest) => {
    setDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${REQUESTS_COLLECTION}`, filedRequestId), filedRequest)
        .catch((error) => {
            console.log("Error - FireStore - Updating FiledRequest: ", error);
        });
}

export const getFiledRequest = (organization: string, group: string, filedRequestId: string): FiledRequest | null => {
    getDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${REQUESTS_COLLECTION}`, filedRequestId))
        .then((documentSnapshot) => {
            return documentSnapshot.data() as FiledRequest
        })
        .catch((error) => {
            console.log("Error - FireStore - Getting FiledRequest: ", error);
        });
    return null;
}

export const deleteFiledRequest = (organization: string, group: string, filedRequestId: string) => {
    deleteDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${REQUESTS_COLLECTION}`, filedRequestId))
        .catch((error) => {
            console.log("Error - FireStore - Deleting FiledRequest: ", error);
        });
}

export const getFiledRequests = (organization: string, group: string): Map<string, FiledRequest> => {
    const groupRef: CollectionReference =
        collection(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${REQUESTS_COLLECTION}`);
    // TODO Add pagination support, for now just using a limit as a guardrail
    // TODO Add support for ordering by different combinations of attributes
    const queryRequest: Query = query(groupRef, orderBy("lastUpdated", "desc"), limit(QUERY_LIMIT), startAfter());

    const filedRequests: Map<string, FiledRequest> = new Map<string, FiledRequest>();
    getDocs(queryRequest)
        .then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                    filedRequests.set(documentSnapshot.id, documentSnapshot.data() as FiledRequest)
                }
            )
        })
        .catch((error) => {
            console.log("Error - FireStore - Querying FiledRequests: ", error);
        });

    return filedRequests;
}