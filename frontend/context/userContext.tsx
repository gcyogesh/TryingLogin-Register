import React, { createContext, useState, useEffect, ReactNode } from 'react';
interface UserContextProviderProps {
    children: ReactNode;
}

export const UserContext = createContext({});

export function UserContextProvider({ children }:UserContextProviderProps) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            fetch('/profile')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setUser(data);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [user]); // Make sure to include `user` in the dependency array to prevent infinite loops

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
