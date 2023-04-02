import {FiledRequest} from "./filedRequest";
import {User} from "./user";

export const INSIGHTS_COLLECTION = "insights"

export interface Insight {
    createdBy: string; // userId
    createDate: number;
    title: string;
    request: string[]; // filedRequestIds
    collaborators: string[] // userIds/groupsIds;
    description?: string;
    attachments?: string[]; // TODO Support complex media types
    repositoryUrl?: string;
    comments?: string[];
}