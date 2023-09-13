import { useContext, useEffect, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import { AccountContext } from "../../../context/AccountProvider";
import { getConversation, setConversation } from "../../../service/api";
import { formatDate } from "../../../utils/common-utils";

const Component = styled(Box)`
    display: flex;
    height: 3rem;
    padding: 0.7rem;
    cursor :pointer;
`
const Image = styled("img")({
    width: 50,
    height: 50,
    borderRadius: '50%',
    padding: "0rem"
});

const ImgComponent = styled(Box)`
    padding: 0 0.04rem 2rem;    
`;

const Container = styled(Box)`
    display:flex;
    word-break: break-word;
`;

const Text = styled(Typography)`
    display: block;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    margin-top:7px;
`;

const Timestamp = styled(Typography)`
    font-size: 12px;
    color: #00000099;
    margin-left: auto;
    margin-right: 8px;
`;

const Conversation = ({ user }) => {

    const { account, setPerson, newMessageFlag } = useContext(AccountContext);
    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationMessage = async () => {
            let response = await getConversation({ senderId: account.email, receiverId: user.email });
            console.log(response);
            setMessage({ text: response?.message, timestamp: response?.updatedAt });
        }
        getConversationMessage();
    }, [newMessageFlag]);

    const getUser = async () => {
        setPerson(user);
        await setConversation({ senderId: account.email, receiverId: user.email });
    }
    return (
        <Component onClick={() => getUser()}>
            <ImgComponent>
                <Image src={user.picture} alt="dp" />
            </ImgComponent>
            <Box style={{ width: '100%', paddingLeft: "16px" }}>
                <Container>
                    <Typography>{user.name.slice(0, 29)}</Typography>
                    {
                        message?.text &&
                        <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
                    }
                </Container>
                <Box>
                    <Text>{message?.text?.includes('localhost') ? 'media' :
                        (message?.text?.slice(0, 32))}</Text>
                </Box>
            </Box>
        </Component>
    );
}

export default Conversation;