import { useContext } from "react";
import { Box, Typography, styled, CssBaseline } from "@mui/material";
import { formatDate, downloadMedia } from "../../../utils/common-utils";
import { AccountContext } from "../../../context/AccountProvider";
import { iconPDF } from "../../../constants/data";
import { GetApp as GetAppIcon } from "@mui/icons-material";

const Own = styled(Box)`
    background: #F0F5F9;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    display: flex;
    border-radius: 7px;
    word-break: break-word;
`;

const Wrapper = styled(Box)`
    background: #FFFFFF;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-radius: 7px;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 1.1rem;
    padding: 0 25px 0 5px;
`;

const Image = styled("img")({
    width: 27,
    height: 27,
    borderRadius: '50%',
});

const ImgComponentSender = styled(Box)`
 padding:4px 0px 0px 10px;
`;
const ImgComponentReceiver = styled(Box)`
    padding:4px 10px 0px 0;
`;
const MessageBox = styled(Box)`
   display:flex;
`;

const Time = styled(Typography)`
    font-size: 0.7rem;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

const Message = ({ message, date, senderId, messageType, senderDp, receiverDp }) => {

    const { account } = useContext(AccountContext);

    return (
        <>
            {
                account.email === senderId ?

                    <MessageBox>
                        <Own>
                            {
                                messageType === "file" ? <ImageMessage message={message} date={date} /> : <TextMessage message={message} date={date} />
                            }
                        </Own>
                        <ImgComponentSender>
                            <Image src={senderDp} alt="dp" />
                        </ImgComponentSender>
                    </MessageBox>

                    :
                    <MessageBox>
                        <ImgComponentReceiver>
                            <Image src={receiverDp} alt="dp" />
                        </ImgComponentReceiver>
                        <Wrapper>
                            {
                                messageType === "file" ? <ImageMessage message={message} date={date} /> : <TextMessage message={message} date={date} />
                            }
                         
                        </Wrapper>
                    </MessageBox>


            }
        </>
    );
}

const TextMessage = ({ message, date }) => {

    return (
        <>
            <Text>{message}</Text>
            <Time>{formatDate(date)}</Time>
        </>
    )
}

const ImageMessage = ({ message, date }) => {

    return (
        <Box style={{ position: 'relative' }}>
            {
                message?.includes('.pdf') ?
                    <Box style={{ display: 'flex' }}>
                        <img src={iconPDF} alt="pdf-icon" style={{ width: 80 }} />
                        <Typography style={{ fontSize: 14 }}>{message.split("/").pop()}</Typography>
                    </Box>
                    :
                    <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message} alt={message} />
            }
            <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
                <GetAppIcon
                    onClick={(e) => downloadMedia(e, message)}
                    fontSize='small'
                    style={{
                        marginRight: 10, border: '1px solid grey', borderRadius: '50%', cursor: "pointer",
                    }}
                />
                {formatDate(date)}
            </Time>
        </Box>
    )
}

export default Message;