import {Insight} from "@interfaces/insight";
import Logo from "@assets/images/shareable-logo.png";

export const DEMO_INSIGHTS: {[id: string]: Insight} = {
    "insightId1": {
        createdBy: 'userId',
        ticketId: 'DATASCI-2864:',
        title: 'DEMO - Title blah blah blah',
        createDate: 1,
        lastUpdated: 2,
        imgs: [{src: Logo, alt: 'google image'}],
        outcomeNumber: 21,
        keyStat: '21% increase per annum',
        keyNumber: '21%',
        tldr: 'string string string string string string string string string ',
        takeaway: 'string string string string string string string string',
        requests: ['RequestId1'],
        collaborators: ['UserId1']
    },
    "insightId2": {
        createdBy: 'userId2',
        ticketId: 'DATASCI-2202:',
        title: 'DEMO - Title blah blah blah',
        createDate: 3,
        lastUpdated: 4,
        imgs: [{src: Logo, alt: 'google image'}],
        outcomeNumber: 25,
        keyStat: '25% increase per annum',
        keyNumber: '25%',
        tldr: 'string string string string string string string string string ',
        takeaway: 'string string string string string string string string',
        requests: ['RequestId2'],
        collaborators: ['UserId2']
    }
}