import TicketFeedContainer from '../components/TicketFeedContainer/TicketFeedContainer';
import Logo from '../assets/images/shareable-logo.png';
import { addInsight, deleteInsight, getInsights } from '../actions/insightActions';
import { TEST_ORGANIZATION } from '@interfaces/organization';
import { TEST_GROUP } from '@interfaces/group';
import { Insight } from '@interfaces/insight';
import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import {
    addFiledRequest,
    deleteFiledRequest,
    getFiledRequests,
} from '../actions/filedRequestActions';
import { FiledRequest } from '@interfaces/filedRequest';
import { DEMO_REQUESTS } from '../databases/filedRequests';
import { DEMO_INSIGHTS } from '../databases/insights';

const Dashboard = () => {
    const [displayedRequests, setDisplayedRequests] = useState<{ [id: string]: FiledRequest }>(
        DEMO_REQUESTS
    );
    const [displayedInsights, setDisplayedInsights] = useState<{ [id: string]: Insight }>(
        DEMO_INSIGHTS
    );

    useEffect(() => {
        (async () => {
            try {
                const storedRequests = await getFiledRequests(TEST_ORGANIZATION, TEST_GROUP);
                setDisplayedRequests({ ...displayedRequests, ...storedRequests });
            } catch (error: unknown) {
                console.log('Fetching requests broken very sad');
            }
            try {
                const storedInsights = await getInsights(TEST_ORGANIZATION, TEST_GROUP);
                setDisplayedInsights({ ...displayedInsights, ...storedInsights });
            } catch (error: unknown) {
                console.log('Fetching insights broken very sad');
            }
        })();
    }, []);

    // Generate and store hardcoded insight object for now
    const createNewInsight = async () => {
        const hardcodedInsight: Insight = {
            createdBy: 'userId',
            createDate: 1,
            lastUpdated: 2,
            ticketId: 'DATASCI-2864:',
            title: 'FireBase - Title blah blah blah',
            imgs: [{ src: Logo, alt: 'google image' }],
            outcomeNumber: 21,
            keyStat: '21% increase per annum',
            keyNumber: '21%',
            tldr: 'string string string string string string string string string',
            takeaway: 'string string string string string string string string',
            requests: ['RequestId1'],
            collaborators: ['UserId1'],
        };
        try {
            const insightId: string = await addInsight(
                TEST_ORGANIZATION,
                TEST_GROUP,
                hardcodedInsight
            );
            const newInsightEntry: { [id: string]: Insight } = { [insightId]: hardcodedInsight };
            setDisplayedInsights({ ...displayedInsights, ...newInsightEntry });
        } catch (error: unknown) {
            // Replace with user visible messaging
            console.log('Could not create new insight');
        }
    };

    // Generate and store hardcoded request object for now
    const createNewFiledRequest = async () => {
        const hardcodedFiledRequest: FiledRequest = {
            createdBy: 'BigBossId',
            createDate: 123,
            lastUpdated: 123,
            title: 'FireBase - Title blah blah blah',
            assignee: 'CodeMonkeyId',
            priority: 'High',
            status: 'Assigned',
            deadline: 123,
        };
        try {
            const filedRequestId: string = await addFiledRequest(
                TEST_ORGANIZATION,
                TEST_GROUP,
                hardcodedFiledRequest
            );
            const newRequestEntry: { [id: string]: FiledRequest } = {
                [filedRequestId]: hardcodedFiledRequest,
            };
            setDisplayedRequests({ ...displayedRequests, ...newRequestEntry });
        } catch (error: unknown) {
            // Replace with user visible messaging
            console.log('Could not create new request');
        }
    };

    const generateDeleteFiledRequestHandler = (filedRequestId: string): (() => void) => {
        return async () => {
            try {
                await deleteFiledRequest(TEST_ORGANIZATION, TEST_GROUP, filedRequestId);
                const requestsCopy: { [id: string]: FiledRequest } = { ...displayedRequests };
                delete requestsCopy[filedRequestId];
                setDisplayedRequests(requestsCopy);
            } catch {
                console.log('Could not delete filed request');
            }
        };
    };

    const generateDeleteInsightHandler = (insightId: string): (() => void) => {
        return async () => {
            try {
                await deleteInsight(TEST_ORGANIZATION, TEST_GROUP, insightId);
                const insightsCopy: { [insightId: string]: Insight } = { ...displayedInsights };
                delete insightsCopy[insightId];
                setDisplayedInsights(insightsCopy);
            } catch {
                console.log('Could not delete insight');
            }
        };
    };

    return (
        <Box
            sx={{
                border: '1px #000 solid',
                background: '#fff',
                width: '100vw',
                height: '100vh',
                marginTop: '100px',
            }}
        >
            {/**TODO: Current button placement is very cursed, need to adjust**/}
            <Button onClick={createNewFiledRequest}>New Request</Button>
            <Button onClick={createNewInsight}>New Insight</Button>
            <TicketFeedContainer
                filedRequestData={displayedRequests}
                deleteFiledRequestHandlerGenerator={generateDeleteFiledRequestHandler}
                insightData={displayedInsights}
                deleteInsightHandlerGenerator={generateDeleteInsightHandler}
            />
        </Box>
    );
};

export default Dashboard;
