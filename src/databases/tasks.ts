import { Task } from '@interfaces/task';

export const DEMO_TASKS: { [id: string]: Task } = {
    taskId1: {
        createdBy: 'BigBossId',
        createDate: 123,
        lastUpdated: 123,
        title: 'DEMO - Title blah blah blah',
        assignee: 'CodeMonkeyId',
        priority: 'High',
        status: 'To Do',
        deadline: null,
        project: 'Project1',
        description: 'Description1',
    },
    taskId2: {
        createdBy: 'BigBossId',
        createDate: 123,
        lastUpdated: 123,
        title: 'DEMO - Title blah blah blah',
        assignee: 'CodeMonkeyId',
        priority: 'High',
        status: 'To Do',
        deadline: null,
        project: 'Project2',
        description: 'Description2',
    },
};
