import { Box , Typography ,styled } from '@mui/material';
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { setConversation } from '../../../service/api';

const Component = styled(Box)`
    display : flex;
    height : 45px;
    padding : 14px 0;
    cursor : pointer;
`

const Image = styled('img')({
    height : 50,
    width : 50,
    borderRadius : '50%',
    padding : '0 14px'
})

const Text = styled(Typography)`
    color : #000;
    opacity : 0.7;
`

const Conversation = ({ user }) => {
    const { setPerson , account } = useContext(AccountContext);

    const getUser = async () => {
        setPerson(user);
        await setConversation({senderId : account.sub, recieverId : user.sub});
    }

    return (
        <Component onClick = {() => getUser()}>
            <Box>
                <Image src = {user.picture} alt = 'dp'/>
            </Box>
            <Box>
                <Box>
                    <Text>{user.name}</Text>
                </Box>
            </Box>
        </Component>
    );
}

export default Conversation;