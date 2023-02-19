import { ReactNode } from 'react';

import Dashboard from '@pages/Dashboard';
import SignIn from '@pages/SignIn';
import { Navigate } from 'react-router-dom';

interface Route {
    path: string;
    element: ReactNode;
}

const routes: Route[] = [
    {
        path: '/sign-in',
        element: <SignIn />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/',
        element: <Navigate to="/sign-in" />
    },
    // {
    //     path: '*',
    //     element: <Navigate to="/sign-in" />
    // }
];

export default routes;
