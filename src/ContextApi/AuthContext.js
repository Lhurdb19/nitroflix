import { createContext, useCallback, useState, useEffect } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    Signin: () => {},
    Signout: () => {},
    Register: () => {},
    user: null,
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    


    //Function to set the user log in
    const Signin = useCallback(async (email, password) => {
        return new Promise((resolve) => {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find((user) => user.email === email && user.password === password);
    
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("user", JSON.stringify(user));
                resolve(true);
            } else {
                alert("Invalid email or password.");
                resolve(false);
            }
        });
    }, []);
    

      //function  to register a new user
    const Register = useCallback(async (email, password, lastName = "") => {
        return new Promise((resolve) => {
            const firstName = email.split('@')[0]; 
            let users = JSON.parse(localStorage.getItem("users")) || [];
            
            if (users.some((user) => user.email === email)) {
                alert("User already exists. Please log in.");
                resolve(false);
                return;
            }
            
            users.push({ firstName, lastName, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful. You can now log in.");
            resolve(true);
        });
    }, []);
    

    //function to set the user as logged out
    const Signout = useCallback(()=> {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
    }, []);

    //Load Login status from localStorage on component mount
    useEffect(()=> {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if(storedLoginStatus === "true" && storedUser) {
            setIsLoggedIn(true);
            setUser(storedUser)
        }
    }, []);


    //Update localStorage whenever login status changes
    useEffect(()=> {
        localStorage.setItem('isLoggenIn', isLoggedIn.toString());
    }, [isLoggedIn])


    const value = { isLoggedIn, user, Register, Signin, Signout };

    //Provide the context to the children components
    return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
    );
};