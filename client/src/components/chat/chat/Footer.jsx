import { useEffect, useState } from 'react';
import { EmojiEmotions, AttachFile } from '@mui/icons-material';
import EmojiPicker from "emoji-picker-react";
import SendIcon from '@mui/icons-material/Send';
import { Box, styled, InputBase } from '@mui/material';
import { uploadFile } from '../../../service/api';

const Container = styled(Box)`
    height:60px;
    background: #F0F5F9;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0px 18px;
    &  > * {
        margin:0.45rem;
        color: #1E2022;
        padding:2.7px;
    }
`;

const Search = styled(Box)`
    border-radius: .8rem;
    background-color: #FFFFFF;
    width: calc(96% - 90px);
`;

const InputField = styled(InputBase)` 
    width: 100%;
    padding: 1.2rem;
    padding-left: 1rem;
    font-size: 14px;
    height: 1rem;
`;

const EmojiBox = styled(Box)`   
    margin-bottom: 30rem;
    position:absolute;
`;

const Footer = ({ setValue, sendText, value, file, setFile, setImage }) => {

    const [togglePicker, setTogglePicker] = useState(false);
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setValue(e.target.files[0].name);
    }

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await uploadFile(data);
                setImage(response.data);
                console.log(response);
            }
        }
        getImage();
    }, [file]);


    return (
        <Container>
            <EmojiBox>
                {
                    togglePicker && (
                        <EmojiPicker
                            emojiStyle='google'
                            height={400}
                            width={400}
                            skinTonesDisabled="false"
                            onEmojiClick={(e) => {
                                setValue(value + e.emoji);
                                setTogglePicker(false);
                            }} />
                    )
                }
            </EmojiBox>
            <EmojiEmotions
                onClick={() => setTogglePicker((togglePicker) => !(togglePicker))}
                sx={{
                    fontSize: 33,
                    mt: 2.5,
                    mb: 2,
                    ml: 0.7,
                    color: "#3D5656",
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
            />
            <label htmlFor="fileInput">
                <AttachFile
                    sx={{
                        transform: "rotate(40deg)",
                        fontSize: 26,
                        mt: 2,
                        mb: 1,
                        color: "#3D5656",
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }} />
            </label>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => onFileChange(e)}
            />

            <Search>
                <InputField
                    placeholder="Type a your message here ...."
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => sendText(e)}
                    value={value}
                />
            </Search>
            <SendIcon
                onClick={(e) => sendText(e)}
                sx={{
                    fontSize: 30,
                    color: "#3D5656",
                    "&:hover": {
                        cursor: "pointer",
                    },
                }} />
        </Container>
    )
}

export default Footer;