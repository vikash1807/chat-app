import { styled, Drawer, Box, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Profile from './Profile.jsx';

const Header = styled(Box)`
  background: #1E2022;
  height: 107px;
  color: #F0F5F9;
  display: flex;
   & > p {
    margin-top: auto;
    padding:10px;
    font-weight: 600;
  }
  & > svg{
    margin:4.1rem 0 0 0.3rem ;
  }
`;

const Component = styled(Box)`
  background: #F0F5F9;
  height: 85%;
`;

const Text = styled(Typography)`
    font-size: 18px;
`

const drawerStyle = {
    left: 20,
    top: 17,
    height: '95%',
    width: '30%',
    boxShadow: 'none'
}

const InfoDrawer = ({ open, setOpen, profile }) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: drawerStyle }}
            style={{ zIndex: 1500 }}
        >
            <Header>
                <ChevronLeftIcon onClick={() => setOpen(false)} sx={{
                    fontSize: 36,
                    "&:hover": {
                        cursor: "pointer",
                    },
                }} />
                <Text>Profile</Text>
            </Header>
            <Component>
                {profile && <Profile />}
            </Component>
        </Drawer>
    );
}

export default InfoDrawer;