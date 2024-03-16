import { Box } from '@mui/material';
import { ChatHeader } from './ChatHeader';
import { Messages } from './Messages';
import { useContext , useEffect , useState } from 'react';
import { AccountContext } from '../context/AccountProvider';
import { getConversation } from  '../../service/api.js';

export const ChatBox = () => {

    const { person , account} = useContext(AccountContext);

    const [conversation,setConversation] = useState({});

    useEffect(()=>{
        const getConversationDetails = async () => {
            const data = await getConversation({senderId : account.sub , recieverId : person.sub});
            setConversation(data);
        }
        getConversationDetails();
    },[person.sub,account.sub])


    return (
        <Box style = {{height : '75%'}}>
            <ChatHeader person = {person} />
            <Messages person = {person} conversation = {conversation}/>
        </Box>
    )
}