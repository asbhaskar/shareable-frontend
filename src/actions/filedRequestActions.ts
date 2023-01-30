import { firestore } from '../firebase'
import {FiledRequest, REQUESTS_COLLECTION} from "../types/filedRequest";
import {v4 as uuidv4} from 'uuid';
import {doc, setDoc} from "firebase/firestore";
import {ORGANIZATIONS_COLLECTION, TEST_ORGANIZATION} from "../types/organization";
import {GROUPS_COLLECTION, TEST_GROUP} from "../types/group";

export const addFiledRequest = (filedRequest: FiledRequest) => {
    const uuid = uuidv4()

    setDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${TEST_ORGANIZATION}/${GROUPS_COLLECTION}/${TEST_GROUP}/${REQUESTS_COLLECTION}`, uuid), {
        //TODO Add FireStore converter for FiledRequest
    }).then(() => {

    });
}

