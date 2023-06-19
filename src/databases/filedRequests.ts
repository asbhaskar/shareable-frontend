import { FiledRequest } from '@interfaces/filedRequest';

export const DEMO_REQUESTS: { [id: string]: FiledRequest } = {
    requestId1: {
        createdBy: 'BigBossId',
        createDate: 123,
        lastUpdated: 123,
        title: 'DEMO - Title blah blah blah',
        assignee: 'CodeMonkeyId',
        priority: 'High',
        status: 'Assigned',
        deadline: 123,
    },
    requestId2: {
        createdBy: 'BigBossId',
        createDate: 123,
        lastUpdated: 123,
        title: 'DEMO - Title blah blah blah',
        assignee: 'CodeMonkeyId',
        priority: 'High',
        status: 'Assigned',
        deadline: 123,
    },
};
