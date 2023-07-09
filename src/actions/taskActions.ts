import { firestore } from '../firebase';
import { Task, TASKS_COLLECTION } from '@interfaces/task';
import { v4 as uuidv4 } from 'uuid';
import {
    doc,
    setDoc,
    getDocs,
    deleteDoc,
    query,
    orderBy,
    limit,
    collection,
    getDoc,
} from 'firebase/firestore';
import { ORGANIZATIONS_COLLECTION } from '@interfaces/organization';
import { GROUPS_COLLECTION } from '@interfaces/group';
import { CollectionReference, Query } from '@firebase/firestore';

const QUERY_LIMIT: number = 100;

export const addTask = async (organization: string, group: string, task: Task): Promise<string> => {
    const taskId: string = uuidv4();

    try {
        await setDoc(
            doc(
                firestore,
                `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${TASKS_COLLECTION}`,
                taskId
            ),
            task
        );
        return taskId;
    } catch (error: unknown) {
        console.log('Error - FireStore - Adding Task: ', error);
        throw error;
    }
};

export const updateTask = async (
    organization: string,
    group: string,
    taskId: string,
    task: Task
) => {
    try {
        await setDoc(
            doc(
                firestore,
                `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${TASKS_COLLECTION}`,
                taskId
            ),
            task
        );
    } catch (error: unknown) {
        console.log('Error - FireStore - Updating Task: ', error);
        throw error;
    }
};

export const getTask = async (
    organization: string,
    group: string,
    taskId: string
): Promise<Task> => {
    try {
        const taskDocument = await getDoc(
            doc(
                firestore,
                `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${TASKS_COLLECTION}`,
                taskId
            )
        );
        if (taskDocument.exists()) {
            return taskDocument.data() as Task;
        }
    } catch (error: unknown) {
        console.log('Error - FireStore - Getting Task: ', error);
        throw error;
    }
    console.log('Error - FireStore - Getting Task: No filed task found for id: ' + taskId);
    throw new Error();
};

export const deleteTask = async (organization: string, group: string, taskId: string) => {
    try {
        await deleteDoc(
            doc(
                firestore,
                `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${TASKS_COLLECTION}`,
                taskId
            )
        );
    } catch (error: unknown) {
        console.log('Error - FireStore - Deleting Task: ', error);
        throw error;
    }
};

export const getTasks = async (
    organization: string,
    group: string
): Promise<{ [id: string]: Task }> => {
    const groupRef: CollectionReference = collection(
        firestore,
        `${ORGANIZATIONS_COLLECTION}/${organization}/${GROUPS_COLLECTION}/${group}/${TASKS_COLLECTION}`
    );
    // TODO Add pagination support, for now just using a limit as a guardrail
    // TODO Add support for ordering by different combinations of attributes
    const queryRequest: Query = query(groupRef, orderBy('lastUpdated', 'desc'), limit(QUERY_LIMIT));

    const tasks: { [id: string]: Task } = {};
    try {
        const queryDocs = await getDocs(queryRequest);
        queryDocs.forEach(documentSnapshot => {
            tasks[documentSnapshot.id] = documentSnapshot.data() as Task;
        });
        return tasks;
    } catch (error: unknown) {
        console.log('Error - FireStore - Querying Tasks: ', error);
        throw error;
    }
};
