import TicketFeedContainer from '../components/TicketFeedContainer/TicketFeedContainer'
import Logo from '../assets/images/shareable-logo.png'
import {addInsight, deleteInsight, getInsights} from "../actions/insightActions";
import {TEST_ORGANIZATION} from "@interfaces/organization";
import {TEST_GROUP} from "@interfaces/group";
import {Insight} from "@interfaces/insight";
import {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import {addFiledRequest, getFiledRequests} from "../actions/filedRequestActions";
import {FiledRequest} from "@interfaces/filedRequest";

const demoInsights: {[id: string]: Insight} = {
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
        takeaways: 'string string string string string string string string',
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
        takeaways: 'string string string string string string string string',
        requests: ['RequestId2'],
        collaborators: ['UserId2']
    }
}

const demoRequests: {[id: string]: FiledRequest} = {
    "requestId1": {
        createdBy: "BigBossId",
        createDate: 123,
        lastUpdated: 123,
        title: "DEMO - Title blah blah blah",
        assignee: "CodeMonkeyId",
        priority: "High",
        status: "Assigned",
        deadline: 123
    },
    "requestId2": {
        createdBy: "BigBossId",
        createDate: 123,
        lastUpdated: 123,
        title: "DEMO - Title blah blah blah",
        assignee: "CodeMonkeyId",
        priority: "High",
        status: "Assigned",
        deadline: 123
    }
}

const Dashboard = () => {
    const [displayedRequests, setDisplayedRequests] = useState<{[id: string]: FiledRequest}>(demoRequests);
    const [displayedInsights, setDisplayedInsights] = useState<{[id: string]: Insight}>(demoInsights);

    useEffect(() => {
        (async () => {
            try {
                const storedRequests = await getFiledRequests(TEST_ORGANIZATION, TEST_GROUP);
                // TODO: Refactor, current state is a bit hacky to force React to update
                setDisplayedRequests({...displayedRequests, ...storedRequests});
            } catch (error) {
                console.log("Fetching requests broken very sad")
            }
            try {
                const storedInsights = await getInsights(TEST_ORGANIZATION, TEST_GROUP);
                // TODO: Refactor, current state is a bit hacky to force React to update
                setDisplayedInsights({...displayedInsights, ...storedInsights});
            } catch (error) {
                console.log("Fetching insights broken very sad")
            }
        })();
    }, [])

    // Generate and store hardcoded insight object for now
    const createNewInsight = async () => {
        const hardcodedInsight: Insight = {
            createdBy: 'userId',
            createDate: 1,
            lastUpdated: 2,
            ticketId: 'DATASCI-2864:',
            title: 'FireBase - Title blah blah blah',
            imgs: [{src: Logo, alt: 'google image'}],
            outcomeNumber: 21,
            keyStat: '21% increase per annum',
            keyNumber: '21%',
            tldr: 'string string string string string string string string string',
            takeaways: 'string string string string string string string string',
            requests: ['RequestId1'],
            collaborators: ['UserId1']
        };
        try {
            const insightId: string = await addInsight(TEST_ORGANIZATION, TEST_GROUP, hardcodedInsight);
            displayedInsights[insightId] = hardcodedInsight;
            setDisplayedInsights({...displayedInsights});
        } catch (error) {
            // Replace with user visible messaging
            console.log("Could not create new insight");
        }
    }

    // Generate and store hardcoded request object for now
    const createNewFiledRequest = async () => {
        const hardcodedFiledRequest: FiledRequest = {
            createdBy: "BigBossId",
            createDate: 123,
            lastUpdated: 123,
            title: "FireBase - Title blah blah blah",
            assignee: "CodeMonkeyId",
            priority: "High",
            status: "Assigned",
            deadline: 123
        };
        try {
            const filedRequestId: string = await addFiledRequest(TEST_ORGANIZATION, TEST_GROUP, hardcodedFiledRequest);
            displayedRequests[filedRequestId] = hardcodedFiledRequest;
            // TODO: Refactor, current state is a bit hacky to force React to update
            setDisplayedRequests({...displayedRequests});
        } catch (error) {
            // Replace with user visible messaging
            console.log("Could not create new request");
        }
    }

    const generateDeleteFiledRequestHandler = (filedRequestId: string): Function => {
        return async () => {
            try {
                await deleteInsight(TEST_ORGANIZATION, TEST_GROUP, filedRequestId);
                delete displayedRequests[filedRequestId];
                // TODO: Refactor, current state is a bit hacky to force React to update
                setDisplayedRequests({...displayedRequests});
            } catch {
                console.log("Could not delete filed request");
            }
        }
    };

    const generateDeleteInsightHandler = (insightId: string): Function => {
        return async () => {
            try {
                await deleteInsight(TEST_ORGANIZATION, TEST_GROUP, insightId);
                delete displayedInsights[insightId];
                setDisplayedInsights({...displayedInsights});
            } catch {
                console.log("Could not delete insight");
            }
        }
    };

    return (
        <Box sx={{
            border: '1px #000 solid',
            background: '#fff',
            width: '100vw',
            height:'100vh',
            marginTop:'100px'
        }}>
            {/**TODO: Current button placement is very cursed, need to adjust**/}
            <Button onClick={async () => {await createNewFiledRequest();}}>
                New Request
            </Button>
            <Button onClick={async () => {await createNewInsight();}}>
                New Insight
            </Button>
            <TicketFeedContainer filedRequestData={displayedRequests}
                                 deleteFiledRequestHandlerGenerator={generateDeleteFiledRequestHandler}
                                 insightData={displayedInsights}
                                 deleteInsightHandlerGenerator={generateDeleteInsightHandler}/>
        </Box>
    )
}

export default Dashboard