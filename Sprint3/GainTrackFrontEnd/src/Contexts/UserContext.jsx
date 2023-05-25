import axios from 'axios';
import { createContext, useEffect, useState } from 'react';


export const UserContext = createContext({});

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState([]);
   

    useEffect(() => {
        if (user) {
            axios.get('/profile')
                .then(({data}) => {
                    setUser(data);
                })
                .catch(() => {
                    setUser(null);
                });
        }
        // const fetchUser = async () => {
        //     try {
        //         const response = await axios.get('/profile');
        //         const userData = response.data.user;
        //         console.log(response.data.user)
        //         setUser(userData);
        //         console.log(response.data.user)
        //     } catch (error) {
        //         setUser(null);
        //     }
        // };
        
        // if (!user) {
        //     fetchUser();
        // }
    }, []);
    // const loginUser = (value) => {
    //     setUser(value)
    //     console.log(value)
    // }
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;