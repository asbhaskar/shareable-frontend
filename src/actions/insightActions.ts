import {firebaseStorage, firestore} from '../firebase'
import {v4 as uuidv4} from 'uuid';
import {doc, setDoc, getDoc, deleteDoc} from "firebase/firestore";
import {uploadBytes, ref, getDownloadURL} from "firebase/storage";
import {ORGANIZATIONS_COLLECTION} from "../interfaces/organization";
import {GROUPS_COLLECTION} from "../interfaces/group";
import {Insight, INSIGHTS_COLLECTION} from "../interfaces/insight";
import {UploadMetadata} from "@firebase/storage";

export const addInsight = (organization: string, group: string, insight: Insight) => {
    const uuid = uuidv4()

    setDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${INSIGHTS_COLLECTION}`, uuid), {insight})
        .catch((error) => {
            console.log("Error - FireStore - Adding Insight: ", error);
        });
}

export const updateInsight = (organization: string, group: string, insightId: string, insight: Insight) => {
    setDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${INSIGHTS_COLLECTION}`, insightId), insight)
        .catch((error) => {
            console.log("Error - FireStore - Updating Insight: ", error);
        });
}

export const getInsight = (organization: string, group: string, insightId: string): Insight | null => {
    getDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${INSIGHTS_COLLECTION}`, insightId))
        .then((documentSnapshot) => {
            return documentSnapshot.data() as Insight
        })
        .catch((error) => {
            console.log("Error - FireStore - Getting Insight: ", error);
        });
    return null;
}

export const deleteInsight = (organization: string, group: string, insightId: string) => {
    deleteDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${INSIGHTS_COLLECTION}`, insightId)).catch((error) => {
        console.log("Error - FireStore - Deleting Insight: ", error);
    });
}

export const storeInsightMedia = (imageFile: File): string | null => {
    const uuid = uuidv4()
    const metadata: UploadMetadata = {
        contentType: 'image/jpeg',
    };

    uploadBytes(ref(firebaseStorage, uuid), imageFile, metadata)
        .then((uploadResult) => {
            getDownloadURL(uploadResult.ref)
                .then((downloadURL: string) => {
                    return downloadURL
                })
                .catch((error) => {
                    console.log("Error - FirebaseStorage - Getting Insight file URLs", error);
                });
            })
        .catch((error) => {
            console.log("Error - FirebaseStorage - Upload Insight files", error);
        });
    return null;
}