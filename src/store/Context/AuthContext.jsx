import { createContext, useReducer } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Initial state for authentication
const initialState = {
    name: "",
    isActive: false
};

// Reducer function to handle different authentication actions
function authUseReducer(state, action) {
    switch (action.type) {
        case "register":
            return { name: "register", isActive: true };
        case "login":
            return { name: "login", isActive: true };
        case "verifyEmail":
            return { name: "verifyEmail", isActive: true };
        case "otp":
            return { name: "otp", isActive: true };
            case "verifyOTP":
                return { name: "verifyOTP", isActive: true };
        case "resetPassword":
            return { name: "resetPassword", isActive: true };
        case "close":
            return { name: "", isActive: false };
        default:
            return state;
    }
}

// AuthContextProvider component to wrap the app with the context
function AuthContextProvider({ children }) {
    const [authState, authDispatch] = useReducer(authUseReducer, initialState);

    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };
