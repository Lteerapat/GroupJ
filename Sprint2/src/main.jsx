import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter, 
    RouterProvider
} from 'react-router-dom';

import Achievement from './Pages/Achievement';
import Add from './Pages/Add';
import ContactUs from './Pages/ContactUs';
import Dashboard from './Pages/Dashboard';
import Edit from './Pages/Edit';
import Error from './Pages/Error';
import Landing from './Pages/Landing';
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
        errorElement: <Error />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <Error />
    },
    {
        path: '/login',
        element: <LogIn />,
        errorElement: <Error />
    },
    {
        path: '/signup',
        element: <SignUp />,
        errorElement: <Error />
    },
    {
        path: '/achievement',
        element: <Achievement />,
        errorElement: <Error />
    },
    {
        path: '/add',
        element: <Add />,
        errorElement: <Error />
    },
    {
        path: '/edit',
        element: <Edit />,
        errorElement: <Error />
    },
    {
        path: '/contactus',
        element: <ContactUs />,
        errorElement: <Error />
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
