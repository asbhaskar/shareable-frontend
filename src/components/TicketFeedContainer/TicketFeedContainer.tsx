import { Box, Button } from '@mui/material';
import InsightCard from '../InsightCard/InsightCard';
import { Insight } from '@interfaces/insight';
import { FiledRequest } from '@interfaces/filedRequest';
import { useState } from 'react';
import FiledRequestCard from '@components/FiledRequestCard/FiledRequestCard';

interface TicketFeedContainerInterface {
    filedRequestData: { [id: string]: FiledRequest };
    deleteFiledRequestHandlerGenerator: (filedRequestId: string) => () => void;
    insightData: { [id: string]: Insight };
    deleteInsightHandlerGenerator: (insightId: string) => () => void;
}

type DisplayType = 'Requests' | 'Insights';

const TicketFeedContainer = ({
    filedRequestData,
    deleteFiledRequestHandlerGenerator,
    insightData,
    deleteInsightHandlerGenerator,
}: TicketFeedContainerInterface) => {
    const [currentDisplay, setCurrentDisplay] = useState<DisplayType>('Requests');
    return (
        <Box>
            <p style={{ color: '#000', textAlign: 'end', padding: '1rem 2rem' }}>
                Sort by Recommended
            </p>
            {/**TODO: Current button placement is very cursed, need to adjust**/}
            <Button
                onClick={() => {
                    setCurrentDisplay('Requests');
                }}
            >
                Show Requests
            </Button>
            <Button
                onClick={() => {
                    setCurrentDisplay('Insights');
                }}
            >
                Show Insights
            </Button>
            {currentDisplay === 'Requests' ? (
                <Box
                    sx={{
                        margin: '2rem auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {Object.entries(filedRequestData).map(([filedRequestId, filedRequest]) => (
                        <FiledRequestCard
                            filedRequestCardData={filedRequest}
                            onDelete={deleteFiledRequestHandlerGenerator(filedRequestId)}
                        />
                    ))}
                </Box>
            ) : (
                <Box
                    sx={{
                        margin: '2rem auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {Object.entries(insightData).map(([insightId, insight]) => (
                        <InsightCard
                            insightCardData={insight}
                            onDelete={deleteInsightHandlerGenerator(insightId)}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TicketFeedContainer;
