export const USERS_COLLECTION = "users"
export const TEST_USER = "TEST_USER"

export interface User {
    organizationId: string;
    groupsIds: string[];

    // Other misc user metadata
}

export interface UserEmailCredentials {
    email: string;
    password: string;
}
