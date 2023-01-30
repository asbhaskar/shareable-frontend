import {Insight} from "./insight";
import {User} from "./user";
import {Group} from "./group";

export const REQUESTS_COLLECTION = "requests"

export interface FiledRequest {
    createdBy: User;
    createDate: number;
    title: string;
    assignee: User | Group;
    priority: RequestPriority;
    status: RequestStatus;
    deadline: number;
    assignedDate?: number;
    completedDate?: number;
    project?: string; // TODO Add project type
    description?: string;
    comments?: string[];
    insights? : Insight[]
}

enum RequestPriority {
    Low,
    Medium,
    High
}

enum RequestStatus {
    Unassigned,
    Assigned,
    Blocked,
    Completed
}