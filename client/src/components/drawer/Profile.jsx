import { useContext } from "react";
import { Box, styled, Typography } from "@mui/material"
import { AccountContext } from "../../context/AccountProvider";

const ImageContainer = styled(Box)`
    display: flex;
    justify-content: center;
`;

const Image = styled('img') ({
    width: 200,
    height: 200,
    borderRadius: '50%',
    padding: '25px 0',
});

const BoxWrapper = styled(Box)`
    background: #FFFFFF;
    padding: 12px 30px 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    & :first-of-type {
        font-size: 13px;
        color: #52616B;
        font-weight: 200;
    };
    & :last-of-type {
        margin: 14px 0;
        color: #4A4A4A;
    }
`;

const DescriptionContainer = styled(Box)`
    padding: 15px 20px 28px 30px;
    & > p {
        color: #8696a0;
        font-size: 13px;
    }
`;

const Profile = () => {

    const { account } = useContext(AccountContext);

    return (
        <>
            <ImageContainer>
                <Image src={account.picture} alt="displaypicture" />
            </ImageContainer>
            <BoxWrapper>
                <Typography>Name</Typography>
                <Typography>{account.name}</Typography>
            </BoxWrapper>
            <DescriptionContainer>
                <Typography>This is your UserName.</Typography>
            </DescriptionContainer>
            <BoxWrapper>
                <Typography>Email</Typography>
                <Typography>This is your Email</Typography>
            </BoxWrapper>
        </>
    )
}

export default Profile;