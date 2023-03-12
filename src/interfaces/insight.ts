import { FiledRequest } from './filedRequest'
import { User } from './user'

export const INSIGHTS_COLLECTION = 'insights'

export interface Insight {
    createdBy: User
    createDate: number
    title: string
    request: FiledRequest
    collaborators: User[]
    description?: string
    attachments?: string[] // TODO Support complex media types
    repositoryUrl?: string
    comments?: string[]
}
