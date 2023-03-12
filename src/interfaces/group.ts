import { FiledRequest } from './filedRequest'
import { Insight } from './insight'

export const GROUPS_COLLECTION = 'groups'
export const TEST_GROUP = 'TEST_GROUP'

export interface Group {
    filedRequests: FiledRequest[]
    insights: Insight[]
    groups: Group[]

    // Other misc group data
}
