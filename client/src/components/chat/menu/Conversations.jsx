import { useEffect, useState, useContext } from "react";
import { Box, styled, Divider } from "@mui/material";
import { AccountContext } from "../../../context/AccountProvider";
import Conversation from "./Conversation";
import { getUsers } from "../../../service/api";

//in case of overflow
const Component = styled(Box)` 
    overflow: overlay; 
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
    margin: 1.5rem 0 0 4.7rem;
    background-color: #e9edef;
    opacity: .9;
`;

const Conversations = ({ text }) => {

    const [userConvo, setUserConvo] = useState([]);
    const { account, socket, setActiveUsers } = useContext(AccountContext);


    useEffect(() => {
        const fetchData = async () => {
            let response = await getUsers();
            const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUserConvo(filteredData);
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit("signup", account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        })
    }, [account]);

    return (
        <Component>
            {
                userConvo && userConvo.map(user => (
                    user.email !== account.email &&
                    <>
                        <Conversation user={user} />
                        <StyledDivider />
                    </>
                ))

            }
        </Component>
    );
};

export default Conversations;