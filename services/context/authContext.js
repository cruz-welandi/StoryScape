'use client'
import { createContext, useContext, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/config';
 
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const SignOut = () => {
        signOut(auth).then(() => {
            setUser(null);
          }).catch((error) => {
            console.log('error : ', error)
        });
    }
    return (
        <AuthContext.Provider value={{ user, setUser, SignOut}}>
            {children}
        </AuthContext.Provider>
    )
}


