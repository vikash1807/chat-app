import { useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';
import { defaultProfilePicture } from '../../../constants/data';
import { AccountContext } from '../../../context/AccountProvider';

const Header = styled(Box)`
    height: 3.7rem;
    background: #F0F5F9;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;

const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 12px;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        margin-top:0.45rem;
        margin-left: 1rem;
        color: #1E2022;
        padding:2.7px;
    }
`;

const Status = styled(Typography)`
    font-size: 12px ;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 12px ;
`;

const ChatHeader = ({ person }) => {

    const url = person.picture || defaultProfilePicture;
    const { activeUsers } = useContext(AccountContext);
    return (
        <Header>
            <Image src={url} alt={person.picture} />
            <Box>
                <Name>{person.name}</Name>
                <Status>{activeUsers?.find(users => users.email=== person.email) ? "Online" : "Offline"}</Status>
            </Box>
            <RightContainer>
                <Search sx={{ fontSize: 30 }} />
                <MoreVert sx={{ fontSize: 30 }} />
            </RightContainer>
        </Header>
    )
}

export default ChatHeader;