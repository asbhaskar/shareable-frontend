import { Box, Button, Card } from '@mui/material'
import styles from './style'
import {FiledRequest} from "@interfaces/filedRequest";

// Just copied over from InsightCard as first draft, field layout will be adjusted
interface FiledRequestCard {
    filedRequestCardData: FiledRequest,
    onDelete: () => void
}

function FiledRequestCard({
    filedRequestCardData,
    onDelete
}: FiledRequestCard) {
    const {
        createdBy,
        createDate,
        lastUpdated,
        title,
        assignee,
        priority,
        status,
        deadline,
        description
    } = filedRequestCardData

    return (
        <Card sx={styles.card}>
            <Box sx={styles.card__header}>
                <Box>
                    <h3>{title}</h3>
                    <h4>{createDate}</h4>
                </Box>
                <Box sx={{marginLeft: '2rem'}}>
                    <h4 style={{color: '#EC7B14'}}>{assignee} Assignee</h4>
                </Box>
            </Box>
            <Box sx={styles.card__body}>
                <Box sx={{width: '60%'}}>
                    <Box>
                        {description}
                    </Box>
                    <Box>
                        {deadline}
                    </Box>
                    <Box>
                        {status}
                    </Box>
                    <Box>
                        {priority}
                    </Box>
                    <Box>
                        {createdBy}
                    </Box>
                    <Box>
                        {lastUpdated}
                    </Box>
                </Box>
            </Box>
            <Box sx={styles.card__footer}>
                <Button>
                    {/* TODO add svg for like button, color in if liked */}
                    Like
                </Button>
                <Button>
                    Comment
                </Button>
                <Button>
                    Share
                </Button>
                {/* Exclude delete button for hardcoded demo insights */}
                {!title.includes("DEMO") &&
                    <Button onClick={onDelete}>
                        Delete
                    </Button>}
            </Box>
        </Card>
    )
}

export default FiledRequestCard