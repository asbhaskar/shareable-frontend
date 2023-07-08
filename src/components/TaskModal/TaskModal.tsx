import { Box, Button, Grid, MenuItem, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Task, TaskPriority } from '@interfaces/task';
import { TEST_USER } from '@interfaces/user';

export type ModalMode = 'Create' | 'Edit';

interface TaskModal {
    modalMode: ModalMode;
    isModalOpen: boolean;
    handleModalClose: () => void;
    createNewTask: (task: Task) => void;
    editTask: (task: Task) => void;
    existingTask?: Task;
}

function TaskModal({
    modalMode,
    isModalOpen,
    handleModalClose,
    createNewTask,
    editTask,
    existingTask,
}: TaskModal) {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const {
        handleChange,
        handleSubmit,
        resetForm,
        values: { title, description, assignee, project, priority, deadline },
    } = useFormik<{
        title: string;
        description: string;
        assignee: string;
        priority: TaskPriority;
        deadline: Date | null;
        project: string;
    }>({
        initialValues:
            modalMode === 'Edit' && existingTask
                ? {
                      title: existingTask!.title,
                      description: existingTask!.description,
                      assignee: existingTask!.assignee,
                      priority: existingTask!.priority,
                      deadline: existingTask!.deadline,
                      project: existingTask!.project,
                  }
                : {
                      title: '',
                      description: '',
                      assignee: '',
                      priority: 'Low',
                      deadline: null,
                      project: '',
                  },
        enableReinitialize: true,
        onSubmit: async ({ title, description, assignee, project, priority, deadline }) => {
            const currentTimestamp: number = Date.now();
            let generatedTask: Task;
            if (modalMode === 'Edit') {
                generatedTask = {
                    ...existingTask!,
                    lastUpdated: currentTimestamp,
                    title,
                    description,
                    assignee,
                    project,
                    priority,
                    deadline,
                };
                await editTask(generatedTask);
            } else {
                generatedTask = {
                    createdBy: TEST_USER,
                    createDate: currentTimestamp,
                    lastUpdated: currentTimestamp,
                    title,
                    description,
                    assignee,
                    project,
                    priority,
                    deadline,
                    status: 'To Do',
                };
                await createNewTask(generatedTask);
            }

            closeAndResetForm();
        },
    });

    const closeAndResetForm = () => {
        handleModalClose();
        resetForm();
    };

    return (
        <Modal open={isModalOpen} onClose={handleModalClose}>
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h2>{modalMode === 'Edit' ? 'Edit a task' : 'Create a task'}</h2>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            required
                            name="title"
                            label="Title"
                            type="text"
                            onChange={handleChange}
                            value={title}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            maxRows={10}
                            name="description"
                            label="Description"
                            type="text"
                            onChange={handleChange}
                            value={description}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            name="project"
                            label="Project"
                            onChange={handleChange}
                            value={project}
                        >
                            <MenuItem key={'Project#1'} value={'Project#1'}>
                                {'Project#1'}
                            </MenuItem>
                            <MenuItem key={'Project#2'} value={'Project#2'}>
                                {'Project#2'}
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            name="deadline"
                            label="Deadline"
                            type="date"
                            onChange={handleChange}
                            value={deadline}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            name="assignee"
                            label="Assignee"
                            onChange={handleChange}
                            value={assignee}
                        >
                            <MenuItem key={TEST_USER} value={TEST_USER}>
                                {TEST_USER}
                            </MenuItem>
                            <MenuItem key={'Random'} value={'Random'}>
                                {'Random'}
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            required
                            select
                            name="priority"
                            label="Priority"
                            onChange={handleChange}
                            value={priority}
                        >
                            <MenuItem key={'Low'} value={'Low'}>
                                {'Low'}
                            </MenuItem>
                            <MenuItem key={'Medium'} value={'Medium'}>
                                {'Medium'}
                            </MenuItem>
                            <MenuItem key={'High'} value={'High'}>
                                {'High'}
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={closeAndResetForm}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
export default TaskModal;
