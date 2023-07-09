import TicketFeedContainer from '../components/TicketFeedContainer/TicketFeedContainer';
import Logo from '../assets/images/shareable-logo.png';
import { addInsight, deleteInsight, getInsights } from '../actions/insightActions';
import { TEST_ORGANIZATION } from '@interfaces/organization';
import { TEST_GROUP } from '@interfaces/group';
import { Insight } from '@interfaces/insight';
import { useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import { addTask, deleteTask, getTasks, updateTask } from '../actions/taskActions';
import { Task } from '@interfaces/task';
import { DEMO_TASKS } from '../databases/tasks';
import { DEMO_INSIGHTS } from '../databases/insights';
import { getUser } from '../actions/userActions';
import { TEST_USER, User } from '@interfaces/user';
import { addUserToGroup } from '../api/addUserToGroup';
import { removeUserFromGroup } from '../api/removeUserFromGroup';
import TaskModal, { ModalMode } from '@components/TaskModal/TaskModal';

const Dashboard = () => {
    const [currentViewedGroup, setCurrentViewedGroup] = useState<string>(TEST_GROUP);
    const [currentUserGroups, setCurrentUserGroups] = useState<string[]>([TEST_GROUP]);
    const [displayedTasks, setDisplayedTasks] = useState<{ [id: string]: Task }>(DEMO_TASKS);
    const [displayedInsights, setDisplayedInsights] = useState<{ [id: string]: Insight }>(
        DEMO_INSIGHTS
    );
    const [newGroupNameInput, setNewGroupNameInput] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                // TODO User should be fetched and persisted upon login
                const user: User = await getUser(TEST_USER);
                setCurrentUserGroups([TEST_GROUP].concat(user.groupsIds));
            } catch (error: unknown) {
                console.log('Fetching user broken very sad');
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const storedTasks = await getTasks(TEST_ORGANIZATION, currentViewedGroup);
                setDisplayedTasks({ ...DEMO_TASKS, ...storedTasks });
            } catch (error: unknown) {
                console.log('Fetching tasks broken very sad');
            }
            try {
                const storedInsights = await getInsights(TEST_ORGANIZATION, currentViewedGroup);
                setDisplayedInsights({ ...DEMO_INSIGHTS, ...storedInsights });
            } catch (error: unknown) {
                console.log('Fetching insights broken very sad');
            }
        })();
    }, [currentViewedGroup]);

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
            tasks: ['TaskId1'],
            collaborators: ['UserId1'],
        };
        try {
            const insightId: string = await addInsight(
                TEST_ORGANIZATION,
                currentViewedGroup,
                hardcodedInsight
            );
            const newInsightEntry: { [id: string]: Insight } = { [insightId]: hardcodedInsight };
            setDisplayedInsights({ ...displayedInsights, ...newInsightEntry });
        } catch (error: unknown) {
            // Replace with user visible messaging
            console.log('Could not create new insight');
        }
    };

    // Generate and store hardcoded task object for now
    const createNewTask = async (task: Task) => {
        try {
            const taskId: string = await addTask(TEST_ORGANIZATION, currentViewedGroup, task);
            const newTaskEntry: { [id: string]: Task } = {
                [taskId]: task,
            };
            setDisplayedTasks({ ...displayedTasks, ...newTaskEntry });
        } catch (error: unknown) {
            // Replace with user visible messaging
            console.log('Could not create new task');
        }
    };

    const createNewGroup = async (groupName: string) => {
        try {
            await addUserToGroup(TEST_USER, groupName);
            setCurrentUserGroups([...currentUserGroups, groupName]);
            setCurrentViewedGroup(groupName);
            setNewGroupNameInput('');
        } catch (error: unknown) {
            // Replace with user visible messaging
            console.log('Could not create new group');
        }
    };

    const leaveGroup = async (groupName: string) => {
        try {
            await removeUserFromGroup(TEST_USER, groupName);
            const filteredUserGroups: string[] = currentUserGroups.filter(
                userGroup => userGroup !== groupName
            );
            setCurrentUserGroups(filteredUserGroups);
            if (currentViewedGroup === groupName) {
                // In current testing state user will always belong to at least DEMO_GROUP
                setCurrentViewedGroup(filteredUserGroups[0]);
            }
        } catch (error: unknown) {
            // Replace with user visible messaging
            console.log('Could not leave group');
        }
    };

    const generateDeleteTaskHandler = (taskId: string): (() => void) => {
        return async () => {
            try {
                await deleteTask(TEST_ORGANIZATION, currentViewedGroup, taskId);
                const tasksCopy: { [id: string]: Task } = { ...displayedTasks };
                delete tasksCopy[taskId];
                setDisplayedTasks(tasksCopy);
            } catch {
                console.log('Could not delete filed task');
            }
        };
    };

    const generateDeleteInsightHandler = (insightId: string): (() => void) => {
        return async () => {
            try {
                await deleteInsight(TEST_ORGANIZATION, currentViewedGroup, insightId);
                const insightsCopy: { [insightId: string]: Insight } = { ...displayedInsights };
                delete insightsCopy[insightId];
                setDisplayedInsights(insightsCopy);
            } catch {
                console.log('Could not delete insight');
            }
        };
    };

    const [isTaskModelOpen, setIsTaskModelOpen] = useState<boolean>(false);
    const handleOpenTaskModal = () => setIsTaskModelOpen(true);
    const handleCloseTaskModal = () => setIsTaskModelOpen(false);

    const [currentTaskModalMode, setCurrentTaskModalMode] = useState<ModalMode>('Create');

    const [currentEditTaskId, setCurrentEditTaskId] = useState<string>('');
    const [currentEditTask, setCurrentEditTask] = useState<Task | undefined>();

    const [loadingTaskModal, setLoadingTaskModal] = useState<boolean>(false);

    const generateEditTaskHandler = (taskId: string, task: Task): (() => void) => {
        return () => {
            setCurrentEditTaskId(taskId);
            setCurrentEditTask({ ...task });
            setCurrentTaskModalMode('Edit');
            setLoadingTaskModal(true);
        };
    };

    const openNewTaskModal = () => {
        setCurrentTaskModalMode('Create');
        setLoadingTaskModal(true);
    };

    useEffect(() => {
        if (loadingTaskModal) {
            handleOpenTaskModal();
            setLoadingTaskModal(false);
        }
    }, [loadingTaskModal]);

    const editTask = async (task: Task) => {
        try {
            await updateTask(TEST_ORGANIZATION, currentViewedGroup, currentEditTaskId, task);
            const tasksCopy: { [id: string]: Task } = { ...displayedTasks };
            tasksCopy[currentEditTaskId] = task;
            setDisplayedTasks(tasksCopy);
        } catch (error: unknown) {
            // Replace with user visible messaging
            console.log('Could not update task');
        }
    };

    return (
        <Box
            sx={{
                border: '1px #000 solid',
                background: '#fff',
                width: '100vw',
                height: '100vh',
                marginTop: '100px',
                // Temporarily forcing this to be visible while the front end structuring is still underway
                zIndex: 100,
            }}
        >
            {/**TODO: Current button placement is very cursed, need to adjust**/}
            <Button onClick={openNewTaskModal}>New Task</Button>
            <TaskModal
                modalMode={currentTaskModalMode}
                isModalOpen={isTaskModelOpen}
                handleModalClose={handleCloseTaskModal}
                createNewTask={createNewTask}
                editTask={editTask}
                existingTask={currentEditTask}
            />
            <Button onClick={createNewInsight}>New Insight</Button>
            {/**TODO: Popup form for new group, validation for input fields**/}
            <div>
                <form onSubmit={() => createNewGroup(newGroupNameInput)}>
                    <label>
                        New Group Name:
                        <input
                            type="text"
                            value={newGroupNameInput}
                            onChange={e => setNewGroupNameInput(e.target.value)}
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
                            style={
                                currentViewedGroup === group
                                    ? { color: 'blue' }
                                    : { cursor: 'pointer' }
                            }
                        >
                            <span
                                onClick={() => {
                                    setCurrentViewedGroup(group);
                                }}
                            >
                                {group}
                            </span>
                            {group !== TEST_GROUP && (
                                <Button
                                    onClick={() => {
                                        leaveGroup(group);
                                    }}
                                >
                                    Leave Group
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <TicketFeedContainer
                taskData={displayedTasks}
                editTaskHandlerGenerator={generateEditTaskHandler}
                deleteTaskHandlerGenerator={generateDeleteTaskHandler}
                insightData={displayedInsights}
                deleteInsightHandlerGenerator={generateDeleteInsightHandler}
            />
        </Box>
    );
};

export default Dashboard;
