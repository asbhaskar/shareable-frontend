export const TASKS_COLLECTION = 'tasks';

export interface Task {
    createdBy: string;
    createDate: number;
    lastUpdated: number;
    title: string;
    assignee: string; // userId || groupId
    priority: TaskPriority;
    status: TaskStatus;
    deadline: Date | null;
    assignedDate?: number;
    completedDate?: number;
    project: string; // TODO Add project type
    description: string;
    comments?: string[];
    insights?: string[]; // insightIds
}

export type TaskPriority = 'Low' | 'Medium' | 'High';

type TaskStatus = 'To Do' | 'In Progress' | 'Blocked' | 'Completed';
