import { useContext, useState, useEffect } from 'react';
import { userSignup, userLogin } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';
import { loginImage } from '../../constants/data';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../service/api';

//mui components
import { Dialog, Typography, Box, styled, Button, AppBar,Divider} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import LockIcon from '@mui/icons-material/Lock';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmailIcon from '@mui/icons-material/Email';

const LoginHeader = styled(AppBar)`
    background: #1E2022;
    height: 275px;
    box-shadow: none;
`;

const Components = styled(Box)`
    height: 100vh;
    background: #F0F5F9;
`;
const ImgBox = styled(Box)`
    margin:4rem 30rem 0rem 0rem;
    padding:auto;
    text-align:center;
`;
const Component = styled(Box)`
    position:absolute;
    width: 450px;
    margin: 1.8rem 0rem 0rem 26rem;
    display:flex;
`;

const Image = styled('img')({
    width: 400,
    display: 'flex',
    padding: '7px 0 0',
    color:"red"
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
    
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #52616B;
    color: #F0F5F9;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #F0F5F9;
    color: #52616B;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const StyledDivider = styled(Divider)`
    margin: 35px 0;
    opacity: 0.7;
`;

const dialogStyle = {
    marginTop: '18%',
    height: '90%',
    width: '60%',
    maxWidth: '100',
    maxHeight: '100%',
    borderRadius: "9px",
    overflow: 'hidden',
    boxshadow: "5px 2px 5px 2px rgb(0 0 0/ 0.6)"
}

const LoginDialog = ({ isUserAuthenticated }) => {

    const { setAccount } = useContext(AccountContext);
    const navigate = useNavigate();

    //initial values
    const signUpInitialValues = {
        name: "",
        email: "",
        picture: "",
        password: ""
    }
    const loginInitialValues = {
        email: "",
        password: ""
    }

    //states
    const [signup, setsignup] = useState(signUpInitialValues);
    const [login, setlogin] = useState(loginInitialValues);
    const [error, setError] = useState("");
    const [formType, setFormType] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [file, setFile] = useState();

    useEffect(() => {
        setError("");
    }, [login]);

    //toggling form mode to signin or signup depending
    const toggleSignup = () => {
        formType === 'signup' ? setFormType('login') : setFormType('signup');
        setError("");
    }

    //filling form data values-signup
    const onInputChange = (e) => {
        setsignup({ ...signup, [e.target.name]: e.target.value });
        setError("");
    }

    //filling form data values-login
    const onValueChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value });
    }

    //call usersignup api
    const handleSignUp = async () => {

        let response = await userSignup(signup);
        console.log(response);
        if (response === "User already exists") {
            setError("User already exists");
        } else {
            setError("");
            setsignup(signUpInitialValues);
            setFormType("login");
        }
    }

    //handling visibility on and off
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //detecting file uploads
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    // picture upload option
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await uploadFile(data);
                setsignup({ ...signup, picture: response.data })
                console.log(response);
            }
        }
        getImage();
    }, [file]);

    //call userlogin api
    const handleLogin = async () => {

        let response = await userLogin(login);

        //invalid credentials
        if (response === "Password does not match") {
            setError("Invalid Password");
        } else if (response === "Email does not match") {
            setError("Invalid Email");
        //successful login
        } else {
            sessionStorage.setItem('accessToken', `Bearer ${response.accessToken}`);
            setError("");
            setAccount({ name: response.name, email: response.email, picture: response.picture });
            isUserAuthenticated(true);
            setlogin(loginInitialValues);
            navigate('/chat');
        }
    }

    return (
        <Components>
            <LoginHeader />
            <Dialog
                open={true}
                BackdropProps={{ style: { backgroundColor: 'unset' } }}
                maxWidth={'md'}
                PaperProps={{ sx: dialogStyle }}
            >
                <ImgBox><Image src={loginImage} alt="chatapp" /></ImgBox>
                <Component>
                    {
                        formType === "login" ?

                        //login form 
                            <Wrapper>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 1.1 }} />
                                    <FormControl sx={{ m: 1, width: '45ch' }} variant="standard">
                                        <InputLabel htmlFor="Email">Email</InputLabel>
                                        <Input
                                            name="email"
                                            type='text'
                                            onChange={(e) => onValueChange(e)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    .com
                                                </InputAdornment>}
                                        />
                                    </FormControl>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 1.1 }} />
                                    <FormControl sx={{ m: 1, width: '45ch' }} variant="standard">
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            onChange={(e) => onValueChange(e)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>}
                                        />
                                    </FormControl>
                                </Box>
                                {error && <Error>{error}</Error>}
                                <LoginButton variant="contained" onClick={() => handleLogin()} >Login</LoginButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 18 }}>Create an account</SignupButton>
                                <Box sx={{mt:1}}><StyledDivider>© Let's Chat</StyledDivider></Box>
                            </Wrapper>

                            :
                            //signup form

                            <Wrapper>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 1.1 }} />
                                    <FormControl sx={{ m: 1, width: '45ch' }} variant="standard">
                                        <InputLabel htmlFor="Username">Username</InputLabel>
                                        <Input
                                            name="name"
                                            type='text'
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </FormControl>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 1.1 }} />
                                    <FormControl sx={{ m: 1, width: '45ch' }} variant="standard">
                                        <InputLabel htmlFor="Email">Email</InputLabel>
                                        <Input
                                            type="text"
                                            name="email"
                                            onChange={(e) => onInputChange(e)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    .com
                                                </InputAdornment>}
                                        />
                                    </FormControl>
                                </Box>
                                <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <CameraAltIcon sx={{ color: 'action.active', mr: 1, my: 0.9 }} />
                                    <FormControl sx={{ m: 1, width: '45ch' }} variant="standard">
                                        <InputLabel htmlFor="picture">
                                        </InputLabel>
                                        <Input
                                            id="picture"
                                            type="file"
                                            onChange={(e) => onFileChange(e)}
                                        />

                                    </FormControl>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 1.1 }} />
                                    <FormControl sx={{ m: 1, width: '45ch' }} variant="standard">
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            onChange={(e) => onInputChange(e)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>}
                                        />
                                    </FormControl>
                                </Box>
                                {error && <Error>{error}</Error>}
                                <SignupButton onClick={() => handleSignUp()} >Signup</SignupButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                            </Wrapper>
                    }
                </Component>
            </Dialog>
        </Components>
    )
}

export default LoginDialog;