import { Box } from '@mui/material';
import styles from './style';
import Logo from '../../assets/images/shareable-logo.png';

function Sidebar() {
    return (
        <Box sx={styles.sidebar}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    borderBottom: '1px #475569 solid',
                }}
            >
                <img src={Logo} alt="shareable-logo" style={{ width: '50px' }} />
                <p>Shareable</p>
            </Box>
        </Box>
    );
}

export default Sidebar;
