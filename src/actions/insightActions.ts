import { firebaseStorage, firestore } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import {
    doc,
    setDoc,
    getDoc,
    deleteDoc,
    collection,
    query,
    orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { ORGANIZATIONS_COLLECTION } from '@interfaces/organization';
import { GROUPS_COLLECTION } from '@interfaces/group';
import { Insight, INSIGHTS_COLLECTION } from '@interfaces/insight';
import { UploadMetadata } from '@firebase/storage';
import { CollectionReference, Query } from '@firebase/firestore';

const QUERY_LIMIT: number = 100;

export const addInsight = async (
    organization: string,
    group: string,
    insight: Insight
): Promise<string> => {
    const insightId = uuidv4();

    try {
        await setDoc(
            doc(
                firestore,
                `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${INSIGHTS_COLLECTION}`,
                insightId
            ),
            insight
        );
        return insightId;
    } catch (error: unknown) {
        console.log('Error - FireStore - Adding Insight: ', error);
        throw error;
    }
};

export const updateInsight = (
    organization: string,
    group: string,
    insightId: string,
    insight: Insight
) => {
    setDoc(
        doc(
            firestore,
            `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${INSIGHTS_COLLECTION}`,
            insightId
        ),
        insight
    ).catch((error: unknown) => {
        console.log('Error - FireStore - Updating Insight: ', error);
    });
};

export const getInsight = async (organization: string, group: string, insightId: string): Promise<Insight> => {
    try {
        const insightDocument = await getDoc(
            doc(
                firestore,
                `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${INSIGHTS_COLLECTION}`,
                insightId
            )
        );
        if (insightDocument.exists()) {
            return insightDocument.data() as Insight
        }
    } catch (error: unknown) {
        console.log('Error - FireStore - Getting Insight: ', error);
        throw error;
    }
    console.log("Error - FireStore - Getting Insight: No insight found for id: " + insightId);
    throw new Error();
}

export const deleteInsight = async (organization: string, group: string, insightId: string) => {
    try {
        await deleteDoc(
            doc(
                firestore,
                `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${INSIGHTS_COLLECTION}`,
                insightId
            )
        );
    } catch (error: unknown) {
        console.log('Error - FireStore - Deleting Insight: ', error);
        throw error;
    }
};

export const storeInsightMedia = (imageFile: File): string | null => {
    const uuid = uuidv4();
    const metadata: UploadMetadata = {
        contentType: 'image/jpeg',
    };

    uploadBytes(ref(firebaseStorage, uuid), imageFile, metadata)
        .then(uploadResult => {
            getDownloadURL(uploadResult.ref)
                .then((downloadURL: string) => {
                    return downloadURL;
                })
                .catch((error: unknown) => {
                    console.log('Error - FirebaseStorage - Getting Insight file URLs', error);
                });
        })
        .catch((error: unknown) => {
            console.log('Error - FirebaseStorage - Upload Insight files', error);
        });
    return null;
};

export const getInsights = async (
    organization: string,
    group: string
): Promise<{ [id: string]: Insight }> => {
    const groupRef: CollectionReference = collection(
        firestore,
        `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${INSIGHTS_COLLECTION}`
    );
    const queryRequest: Query = query(groupRef, orderBy('lastUpdated', 'desc'), limit(QUERY_LIMIT));

    const insights: { [id: string]: Insight } = {};

    try {
        (await getDocs(queryRequest)).forEach(insightDocument => {
            insights[insightDocument.id] = insightDocument.data() as Insight;
        });
        return insights;
    } catch (error: unknown) {
        console.log('Error - FireStore - Querying Insights: ', error);
        throw error;
    }
};
