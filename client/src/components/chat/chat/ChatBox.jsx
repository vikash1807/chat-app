import { useContext, useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';
import { getConversation } from '../../../service/api';

import ChatHeader from './ChatHeader';
import Messages from './Messages';

const ChatBox = () => {
    const { person, account } = useContext(AccountContext);
    const [conversation, setConversation] = useState({});

    useEffect(() => {
        const getConversationDetails = async () => {
            let response = await getConversation({ senderId: account.email, receiverId: person.email });
            setConversation(response);
        }
        getConversationDetails();
    }, [person.email]);

    return (
        <Box>
            <ChatHeader person={person} />
            <Messages person={person} conversation={conversation} />
            <CssBaseline />
        </Box>
    )
}

export default ChatBox;