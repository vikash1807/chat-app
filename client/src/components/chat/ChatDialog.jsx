import { useContext } from 'react';
import { Dialog, styled } from '@mui/material';
import { Box } from '@mui/system';
import EmptyChat from './chat/EmptyChat';
import Menu from './menu/Menu'
import ChatBox from './chat/ChatBox';
import { AccountContext } from '../../context/AccountProvider';
import { AppBar, CssBaseline } from '@mui/material';

const Components = styled(Box)`
    height: 100vh;
    background: #F0F5F9;
`;

const Component = styled(Box)`
    display:flex;
`;

const dialogStyle = {
    height: '96%',
    width: '100%',
    margin: '20px',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
    overflow: 'hidden'
};

const LeftComponent = styled(Box)`
    min-width: 450px;
`;

const RightComponent = styled(Box)`
    width: 73%;
    min-width: 300px;
    height: 100%;
    border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

const Header = styled(AppBar)`
    background-color: #1E2022;
    height: 125px;
    box-shadow: none;
`;

const ChatDialog = () => {

    const { person } = useContext(AccountContext);

    return (
        <Components>
            <Header />
            <Dialog
                open={true}
                BackdropProps={{ style: { backgroundColor: 'unset' } }}
                PaperProps={{ sx: dialogStyle }}
                maxWidth={'md'}
            >
                <Component>
                    <LeftComponent>
                        <Menu />
                    </LeftComponent>
                    <RightComponent>
                        {
                            Object.keys(person).length ? <ChatBox /> : <EmptyChat />
                        }
                    </RightComponent>
                </Component>
            </Dialog>
            <CssBaseline/>
        </Components>
        
    )
}

export default ChatDialog;