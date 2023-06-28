export const ORGANIZATIONS_COLLECTION = 'organizations';
export const TEST_ORGANIZATION = 'TEST_ORGANIZATION';

export interface Organization {
    organizationName: string;
    executives: string[]; // userIds
    // Other misc org data
}
