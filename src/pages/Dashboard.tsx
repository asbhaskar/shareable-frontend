import TicketFeedContainer from '../components/TicketFeedContainer/TicketFeedContainer'
import Logo from '../assets/images/shareable-logo.png'
import {addInsight, deleteInsight, getInsights} from "../actions/insightActions";
import {TEST_ORGANIZATION} from "@interfaces/organization";
import {TEST_GROUP} from "@interfaces/group";
import {Insight} from "@interfaces/insight";
import {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import {addFiledRequest, deleteFiledRequest, getFiledRequests} from "../actions/filedRequestActions";
import {FiledRequest} from "@interfaces/filedRequest";
import {DEMO_REQUESTS} from "../databases/filedRequests";
import {DEMO_INSIGHTS} from "../databases/insights";
import {addUserToGroup, getUser, removeUserFromGroup} from "../actions/userActions";
import {TEST_USER, User} from "@interfaces/user";

const Dashboard = () => {
    const [currentViewedGroup, setCurrentViewedGroup] = useState<string>(TEST_GROUP);
    const [currentUserGroups, setUserGroups] = useState<string[]>([TEST_GROUP]);
    const [displayedRequests, setDisplayedRequests] = useState<{[id: string]: FiledRequest}>(DEMO_REQUESTS);
    const [displayedInsights, setDisplayedInsights] = useState<{[id: string]: Insight}>(DEMO_INSIGHTS);
    const [newGroupNameInput, setNewGroupNameInput] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                // TODO User should be fetched and persisted upon login
                const user: User = await getUser(TEST_USER);
                setUserGroups([TEST_GROUP].concat(user.groupsIds));
            } catch (error: unknown) {
                console.log("Fetching user broken very sad")
            }
            await loadRequestsAndInsights(currentUserGroups[0]);
        })();
    }, [])

    const loadRequestsAndInsights = async (groupName: string) => {
        try {
            const storedRequests = await getFiledRequests(TEST_ORGANIZATION, groupName);
            setDisplayedRequests({...DEMO_REQUESTS, ...storedRequests});
        } catch (error: unknown) {
            console.log("Fetching requests broken very sad")
        }
        try {
            const storedInsights = await getInsights(TEST_ORGANIZATION, groupName);
            setDisplayedInsights({...DEMO_INSIGHTS, ...storedInsights});
        } catch (error: unknown) {
            console.log("Fetching insights broken very sad")
        }
    }

    const switchViewedGroup = async (groupName: string) => {
        setCurrentViewedGroup(groupName);
        await loadRequestsAndInsights(groupName);
    }

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
            takeaway: 'string string string string string string string string',
            requests: ['RequestId1'],
            collaborators: ['UserId1']
        };
        try {
            const insightId: string = await addInsight(TEST_ORGANIZATION, currentViewedGroup, hardcodedInsight);
            const newInsightEntry: {[id: string]: Insight} = {[insightId]: hardcodedInsight}
            setDisplayedInsights({...displayedInsights, ...newInsightEntry});
        } catch (error: unknown) {
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
            const filedRequestId: string = await addFiledRequest(TEST_ORGANIZATION, currentViewedGroup, hardcodedFiledRequest);
            const newRequestEntry: {[id: string]: FiledRequest} = {[filedRequestId]: hardcodedFiledRequest}
            setDisplayedRequests({...displayedRequests, ...newRequestEntry});
        } catch (error: unknown) {
            // Replace with user visible messaging
            console.log("Could not create new request");
        }
    }

    const createNewGroup = async (groupName: string) => {
        try {
            await addUserToGroup(TEST_USER, groupName);
            setUserGroups(currentUserGroups.concat(groupName));
            await switchViewedGroup(groupName);
            setNewGroupNameInput("");
        } catch (error: unknown) {
            // Replace with user visible messaging
            console.log("Could not create new group");
        }
    }

    const leaveGroup = async (groupName: string) => {
        try {
            await removeUserFromGroup(TEST_USER, groupName);
            const filteredUserGroups: string[] = currentUserGroups.filter((userGroup) => userGroup !== groupName);
            setUserGroups(filteredUserGroups);
            if (currentViewedGroup === groupName) {
                // In current testing state user will always belong to at least DEMO_GROUP
                await switchViewedGroup(filteredUserGroups[0]);
            }
        } catch (error: unknown) {
            // Replace with user visible messaging
            console.log("Could not leave group");
        }
    }

    const generateDeleteFiledRequestHandler = (filedRequestId: string): (() => void) => {
        return async () => {
            try {
                await deleteFiledRequest(TEST_ORGANIZATION, currentViewedGroup, filedRequestId);
                const requestsCopy: {[id: string]: FiledRequest} = {...displayedRequests};
                delete requestsCopy[filedRequestId];
                setDisplayedRequests(requestsCopy);
            } catch {
                console.log("Could not delete filed request");
            }
        }
    };

    const generateDeleteInsightHandler = (insightId: string): (() => void) => {
        return async () => {
            try {
                await deleteInsight(TEST_ORGANIZATION, currentViewedGroup, insightId);
                const insightsCopy: {[insightId: string]: Insight} = {...displayedInsights};
                delete insightsCopy[insightId];
                setDisplayedInsights(insightsCopy);
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
            marginTop:'100px',
            // Temporarily forcing this to be visible while the front end structuring is still underway
            zIndex: 100
        }}>
            {/**TODO: Current button placement is very cursed, need to adjust**/}
            <Button onClick={createNewFiledRequest}>
                New Request
            </Button>
            <Button onClick={createNewInsight}>
                New Insight
            </Button>
            {/**TODO: Popup form for new group**/}
            <div>
                <form onSubmit={() => createNewGroup(newGroupNameInput)}>
                    <label>
                        New Group Name:
                        <input
                            type="text"
                            value={newGroupNameInput}
                            onChange={changeEvent => setNewGroupNameInput(changeEvent.target.value)}
                            minLength={3}
                            maxLength={25}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div>
                <span>Groups:</span>
                <ul>
                    {currentUserGroups.map(group => (
                        <li
                            style={currentViewedGroup === group ? {color: 'blue'} : {cursor: 'pointer'}}
                            onClick={currentViewedGroup !== group ? async () => {await switchViewedGroup(group);} : undefined}
                        >
                            {group}
                            {group !== TEST_GROUP && <Button onClick={async () => {await leaveGroup(group)}}>
                                Leave Group
                            </Button>}
                        </li>
                    ))}
                </ul>
            </div>
            <TicketFeedContainer filedRequestData={displayedRequests}
                                 deleteFiledRequestHandlerGenerator={generateDeleteFiledRequestHandler}
                                 insightData={displayedInsights}
                                 deleteInsightHandlerGenerator={generateDeleteInsightHandler}/>
        </Box>
    )
}

export default Dashboard