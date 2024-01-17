import { useEffect , useState , useContext } from 'react';
import { getUsers } from '../../../service/api';
import { Box , styled , Divider} from '@mui/material';
import Conversation from './Conversation';
import { AccountContext } from '../../context/AccountProvider';

const Component = styled(Box)`
    height : 81vh;
    overflow : overlay;
`

const StyledDivider = styled(Divider)`
    margin : 0 0 0 70px;
    background-color : #e9edef;
    opacity : 0.2;
`

const Conversations = ({ Text }) => {

    const [users,setUsers] = useState([]);

    const { account } = useContext(AccountContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUsers();
            const filteredData = response.filter((user) => user.name.toLowerCase().includes(Text.toLowerCase()));
            setUsers(filteredData);
        }
        fetchData();
    },[Text])

    return (
        <Component>
            {
                users.map(user => {
                    return <>
                    {
                    account.sub !== user.sub && <Conversation user = {user} />
                    }
                    <StyledDivider/>
                    </>
                })
            }
        </Component>
    );
}

export default Conversations;