export const REQUESTS_COLLECTION = 'requests';

export interface FiledRequest {
    createdBy: string;
    createDate: number;
    lastUpdated: number;
    title: string;
    assignee: string; // userId || groupId
    priority: RequestPriority;
    status: RequestStatus;
    deadline: number;
    assignedDate?: number;
    completedDate?: number;
    project?: string; // TODO Add project type
    description?: string;
    comments?: string[];
    insights?: string[]; // insightIds
}

type RequestPriority = 'Low' | 'Medium' | 'High';

type RequestStatus = 'Unassigned' | 'Assigned' | 'Blocked' | 'Completed';
