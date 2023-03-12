import { Group } from './group'

export const ORGANIZATIONS_COLLECTION = 'organizations'
export const TEST_ORGANIZATION = 'TEST_ORGANIZATION'

export interface Organization {
    Groups: Group[]

    // Other misc org data
}
