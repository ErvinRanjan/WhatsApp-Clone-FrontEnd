import { Box , styled } from '@mui/material';
import { Footer } from './Footer';
import { useContext , useState , useEffect } from 'react';
import { AccountContext } from '../context/AccountProvider';
import { getMessages, newMessage } from '../../service/api';
import { Message } from './menu/Message';



const Wrapper = styled(Box)`
    background-image : url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size : 50%;
`

const Component = styled(Box)`
    height : 80vh;
    overflow-y : scroll;
`
const Container  = styled(Box) `
    padding : 1px 80px;
`

export const Messages = ({ person , conversation }) => {
    const { account } = useContext(AccountContext);
    const [value , setValue] = useState('');
    const [messages,setMessages] = useState([]);
    const [newMessagesFlag,setNewMessagesFlag] = useState(false);
    const [file,setFile] = useState();

    useEffect(() => {
        const getMessageDetails = async () => {
            const response = await getMessages(conversation._id);
            setMessages(response);
        }
        conversation._id && 
        getMessageDetails();
    },[person._id,conversation._id,newMessagesFlag])

    const sendText = async (e) => {
        const code = e.keyCode || e.which;

        if(code === 13){
            const message = {
                senderId :  account.sub,
                recieverId : person.sub,
                conversationId : conversation._id,
                type : 'text',
                text: value
            };
            
            await newMessage(message);

            setValue('');
            setNewMessagesFlag(prev => !prev);
        }
    }

    return (
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message => {
                        return <>
                        <Container>
                            <Message message = {message} />
                        </Container>
                        </>
                    })
                }
            </Component>
            <Footer sendText = {sendText} 
            setValue = {setValue}
            value = {value}
            file = {file}
            setFile = {setFile}
            />
        </Wrapper>
    );
}