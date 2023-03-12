export const USERS_COLLECTION = 'users'
export interface User {
    organizationId: string
    groupsIds: string[]

    // Other misc user metadata
}

export interface UserEmailCredentials {
    email: string
    password: string
}
