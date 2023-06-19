import { firestore } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from 'firebase/firestore';
import { Organization, ORGANIZATIONS_COLLECTION } from '../../interfaces/organization';

export const addOrganization = (organization: Organization) => {
    const uuid: string = uuidv4();

    setDoc(doc(firestore, ORGANIZATIONS_COLLECTION, uuid), organization).catch((error: unknown) => {
        console.log('Error - FireStore - Adding Organization: ', error);
    });
};
export const getOrganization = (organizationId: string): Organization | null => {
    getDoc(doc(firestore, ORGANIZATIONS_COLLECTION, organizationId))
        .then(documentSnapshot => {
            return documentSnapshot.data() as Organization;
        })
        .catch((error: unknown) => {
            console.log('Error - FireStore - Getting Organization: ', error);
        });
    return null;
};

export const addExecutiveToOrganization = (organizationId: string, userId: string) => {
    updateDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organizationId}`), {
        executives: arrayUnion(userId),
    }).catch((error: unknown) => {
        console.log('Error - FireStore - Adding executive to organization: ', error);
    });
};

export const removeExecutiveFromOrganization = (organizationId: string, userId: string) => {
    updateDoc(doc(firestore, `${ORGANIZATIONS_COLLECTION}/${organizationId}`), {
        executives: arrayRemove(userId),
    }).catch((error: unknown) => {
        console.log('Error - FireStore - Removing executive from organization: ', error);
    });
};
