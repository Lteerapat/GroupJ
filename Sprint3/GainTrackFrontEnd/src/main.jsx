import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter, 
    Navigate, 
    RouterProvider
} from 'react-router-dom';
import axios from 'axios';
import Achievement from './Pages/Achievement';
import Add from './Pages/Add';
import ContactUs from './Pages/ContactUs';
import Dashboard from './Pages/Dashboard';
import Edit from './Pages/Edit';
import Error from './Pages/Error';
import Landing from './Pages/Landing';
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import UserContextProvider, { UserContext } from './Contexts/UserContext';
import Cookies from 'js-cookie';
import EditProfile from './Pages/EditProfile';



axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
axios.defaults.withCredentials = true;


//protect the route from the user who doesn't login or already logout
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('sessionToken');
  
    if (token || sessionToken) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
        errorElement: <Error />
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
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
        path: '/dashboard/achievement',
        element: (
            <ProtectedRoute>
                <Achievement />
            </ProtectedRoute>
        ),
        errorElement: <Error />
    },
    {
        path: '/dashboard/add',
        element: (
            <ProtectedRoute>
                <Add />
            </ProtectedRoute>
        ),
        errorElement: <Error />
    },
    {
        path: '/dashboard/edit',
        element: (
            <ProtectedRoute>
                <Edit />
            </ProtectedRoute>
        ),
        errorElement: <Error />
    },
    {
        path: '/dashboard/edit/:id',
        element: (
            <ProtectedRoute>
                <Edit />
            </ProtectedRoute>
        ),
        errorElement: <Error />
    },
    {
        path: '/contactus',
        element: <ContactUs />,
        errorElement: <Error />
    },
    {
        path: '/dashboard/edit-profile',
        element: (
            <ProtectedRoute>
                <EditProfile />
            </ProtectedRoute>
        ),
        errorElement: <Error />
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <RouterProvider router={router}/>
    </UserContextProvider>
)