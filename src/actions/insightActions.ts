import { firestore } from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc } from 'firebase/firestore'
import { ORGANIZATIONS_COLLECTION, TEST_ORGANIZATION } from '../interfaces/organization'
import { GROUPS_COLLECTION, TEST_GROUP } from '../interfaces/group'
import { Insight, INSIGHTS_COLLECTION } from '../interfaces/insight'

export const addInsight = (insight: Insight) => {
    const uuid = uuidv4()

    setDoc(
        doc(
            firestore,
            `${ORGANIZATIONS_COLLECTION}/${TEST_ORGANIZATION}/${GROUPS_COLLECTION}/${TEST_GROUP}/${INSIGHTS_COLLECTION}`,
            uuid
        ),
        {
            //TODO Add FireStore converter for Insight
        }
    ).then(() => {})
}
