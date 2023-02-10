import TicketFeedContainer from '../components/TicketFeedContainer/TicketFeedContainer'
import { InsightDataInterface } from '../../interfaces/InsightData'
import Logo from '../assets/images/shareable-logo.png'

const InsightData: InsightDataInterface[] = [
    {
        title: 'DATASCI-2864: Title blah blah blah',
        date: '10/2/2011',
        imgs: [{src: Logo, alt: 'google image'}],
        outcomeNumber: 21,
        keyStat: '21% increase per annum',
        keyNumber: '21%',
        tldr: 'string string string string string string string string string ',
        takeaways: 'string string string string string string string string'
    },
    {
        title: 'DATASCI-2202: Title blah blah blah',
        date: '8/3/2010',
        imgs: [{src: Logo, alt: 'google image'}],
        outcomeNumber: 1,
        keyStat: '25% increase per annum',
        keyNumber: '25%',
        tldr: 'string string string string string string string string string ',
        takeaways: 'string string string string string string string string'
    },
]

const Dashboard = () => {
    return (
        <TicketFeedContainer insightData={InsightData}/>
    )
}

export default Dashboard