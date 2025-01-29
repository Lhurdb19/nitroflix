import { createContext, useCallback, useState, useEffect } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    Signin: () => {},
    Signout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Login function  to set the user as logged in
    const Signin = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    //Logout function to set the user as logged out
    const Signout = useCallback(()=> {
        setIsLoggedIn(false);
    }, []);

    //Load Login status from localStorage on component mount
    useEffect(()=> {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if(storedLoginStatus) {
            setIsLoggedIn(storedLoginStatus === 'true');
        }
    }, []);


    //Update localStorage whenever login status changes
    useEffect(()=> {
        localStorage.setItem('isLoggenIn', isLoggedIn.toString());
    }, [isLoggedIn])


    const value = { isLoggedIn, Signin, Signout };

    //Provide the context to the children components
    return<AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}