import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

interface LayoutInterface {
    children: any;
}

const Layout = ({ children }: LayoutInterface) => {
    const { pathname } = useLocation();
    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <Box>
            {pathname !== '/sign-in' ? (
                <>
                    <Navbar />
                    <Box sx={{ display: 'flex' }}>
                        <Sidebar />
                        {children}
                    </Box>
                </>
            ) : (
                <Box sx={{ display: 'flex' }}>{children}</Box>
            )}
        </Box>
    );
};

export default Layout;
