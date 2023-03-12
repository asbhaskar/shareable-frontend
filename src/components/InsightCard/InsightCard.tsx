import { Box, Button, Card } from '@mui/material'
import styles from './style'
import { jsx, css } from '@emotion/react'
import { InsightDataInterface } from '../../../interfaces/InsightData'

interface InsightCard {
    insightCardData: InsightDataInterface
}

function InsightCard({ insightCardData }: InsightCard) {
    const { title, date, imgs, outcomeNumber, keyStat, keyNumber, tldr, takeaways } =
        insightCardData

    return (
        <Card sx={styles.card}>
            <Box sx={styles.card__header}>
                <Box>
                    <h3>{title}</h3>
                    <h4>{date}</h4>
                </Box>
                <Box sx={{ marginLeft: '2rem' }}>
                    <h4 style={{ color: '#EC7B14' }}>{outcomeNumber} Outcomes</h4>
                </Box>
            </Box>
            <Box sx={styles.card__body}>
                <Box sx={{ width: '60%' }}>
                    <Box>{keyStat}</Box>
                    <Box>{keyNumber}</Box>
                    <Box>{tldr}</Box>
                    <Box>{takeaways}</Box>
                </Box>
                {/* TODO: Make img array into separate component w support for multiple imgs */}
                <Box sx={styles.card__imgs}>
                    <img src={imgs[0].src} alt={imgs[0].alt} />
                </Box>
            </Box>
            <Box sx={styles.card__footer}>
                <Button>
                    {/* TODO add svg for like button, color in if liked */}
                    Like
                </Button>
                <Button>Comment</Button>
                <Button>Share</Button>
            </Box>
        </Card>
    )
}

export default InsightCard
