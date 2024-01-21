import { createContext, useState, useContext } from "react";

export const AuthContext = createContext({
    user: { accessToken: "" },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return { accessToken: localStorage.getItem("access_token") };
    });



    return (
        <AuthContext.Provider
            value={{ user, setUser}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}