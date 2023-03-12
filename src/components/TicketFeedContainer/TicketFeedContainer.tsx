import { Box } from '@mui/material'
import { InsightDataInterface } from '../../../interfaces/InsightData'
import InsightCard from '../InsightCard/InsightCard'

interface TicketFeedContainerInterface {
    insightData: InsightDataInterface[]
}

const TicketFeedContainer = ({ insightData }: TicketFeedContainerInterface) => {
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
            <p style={{ color: '#000', textAlign: 'end', padding: '1rem 2rem' }}>
                Sort by Recommended
            </p>
            <Box
                sx={{
                    margin: '2rem auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {insightData.map(insight => (
                    <InsightCard insightCardData={insight} />
                ))}
            </Box>
        </Box>
    )
}

export default TicketFeedContainer
