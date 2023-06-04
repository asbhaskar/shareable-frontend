import { firestore } from '../firebase'
import {FiledRequest, REQUESTS_COLLECTION} from "@interfaces/filedRequest";
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
    getDoc
} from "firebase/firestore";
import {ORGANIZATIONS_COLLECTION} from "@interfaces/organization";
import {GROUPS_COLLECTION} from "@interfaces/group";
import {CollectionReference, Query} from "@firebase/firestore";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;

const QUERY_LIMIT: number = 100

export const addFiledRequest = async (organization: string, group: string, filedRequest: FiledRequest): Promise<string>  => {
    const filedRequestId: string = uuidv4()

    try {
        await setDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${REQUESTS_COLLECTION}`, filedRequestId), filedRequest)
        return filedRequestId;
    } catch (error: unknown) {
        console.log("Error - FireStore - Adding FiledRequest: ", error);
        throw error;
    }
}

export const updateFiledRequest = (organization: string, group: string, filedRequestId: string, filedRequest: FiledRequest) => {
    setDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${REQUESTS_COLLECTION}`, filedRequestId), filedRequest)
        .catch((error: unknown) => {
            console.log("Error - FireStore - Updating FiledRequest: ", error);
        });
}

export const getFiledRequest = async (organization: string, group: string, filedRequestId: string): Promise<FiledRequest | undefined> => {
    try {
        const filedRequestDocument =
            await getDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${REQUESTS_COLLECTION}`, filedRequestId));
        if (filedRequestDocument.exists()) {
            return filedRequestDocument.data() as FiledRequest
        } else {
            console.log("Error - FireStore - Getting FiledRequest: No filed request found for id: " + filedRequestId)
        }
    } catch (error: unknown) {
        console.log("Error - FireStore - Getting FiledRequest: ", error);
        throw error
    }
}

export const deleteFiledRequest = async (organization: string, group: string, filedRequestId: string) => {
    try {
        await deleteDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${REQUESTS_COLLECTION}`, filedRequestId));
    } catch (error: unknown) {
        console.log("Error - FireStore - Deleting FiledRequest: ", error);
        throw error;
    }
}

export const getFiledRequests = async (organization: string, group: string): Promise<{[id: string]: FiledRequest}> => {
    const groupRef: CollectionReference =
        collection(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${REQUESTS_COLLECTION}`);
    // TODO Add pagination support, for now just using a limit as a guardrail
    // TODO Add support for ordering by different combinations of attributes
    const queryRequest: Query = query(groupRef, orderBy("lastUpdated", "desc"), limit(QUERY_LIMIT));

    const filedRequests: {[id: string]: FiledRequest} = {};
    try {
        const queryDocs = await getDocs(queryRequest);
        queryDocs.forEach((documentSnapshot) => {
            filedRequests[documentSnapshot.id] = documentSnapshot.data() as FiledRequest;
        });
        return filedRequests;
    } catch (error: unknown) {
        console.log("Error - FireStore - Querying FiledRequests: ", error);
        throw error
    }
}