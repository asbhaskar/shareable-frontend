export const GROUPS_COLLECTION = 'groups';
export const TEST_GROUP = 'TEST_GROUP';

export interface Group {
    groupName: string;
    managers: string[];
    groups: string[]; // groupIds
    // Other misc group data
}
