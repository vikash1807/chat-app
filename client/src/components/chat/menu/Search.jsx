import { Box,InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Component = styled(Box)`
    background: #fff;
    height: 3.4rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
`;

const Wrapper = styled(Box)`
    position: relative;
    border-radius: 7px;
    background-color: #f0f2f5;
    margin: 0 0.8rem;
    width: 100%;
`;

const Icon = styled(Box)`
    color: #919191;
    height: 100%;
    padding: 0.46rem 0.7rem 0 0.7rem;
    position: absolute;
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 1.1rem;
    padding-left: 4rem;
    font-size: 14px;
    height: 1rem;
    width: 100%;
`;

const Search = ({ setText }) => {
    return (
        <Component>
            <Wrapper>
                <Icon>
                    <SearchIcon fontSize="small" />
                </Icon>
                <InputField
                    placeholder="Search or start new chat"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setText(e.target.value)}
                />
            </Wrapper>
        </Component>
    )
}

export default Search;