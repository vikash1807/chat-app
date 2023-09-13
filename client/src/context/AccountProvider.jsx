import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
export const AccountContext = createContext();

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState({ email: "", name: "", picture: "" });
    const [person, setPerson] = useState({});
    const [activeUsers, setActiveUsers] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const socket = useRef();

    useEffect(() => {
        socket.current = io("http://localhost:9000");
    }, []);

    return (
        <AccountContext.Provider value={{
            account,
            setAccount,
            person,
            setPerson,
            socket,
            activeUsers,
            setActiveUsers,
            newMessageFlag,
            setNewMessageFlag
        }}>
            {children}
        </AccountContext.Provider>
    )
}
export default AccountProvider;