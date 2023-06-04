
export const INSIGHTS_COLLECTION = "insights"

export interface Insight {
    createdBy: string; // userId
    createDate: number;
    lastUpdated: number;
    ticketId: string,
    title: string;
    imgs: {src: string, alt: string}[],
    outcomeNumber: number,
    keyStat: string,
    keyNumber: string,
    tldr: string,
    requests: string[]; // filedRequestIds
    collaborators: string[] // userIds/groupsIds;
    takeaway?: string;
    repositoryUrl?: string;
    comments?: string[];
}