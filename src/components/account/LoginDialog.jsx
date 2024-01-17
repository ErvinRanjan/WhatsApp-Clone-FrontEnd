import {Dialog,Box,Typography,List,ListItem,styled} from '@mui/material';
import { qrCodeImage } from '../../constants/data';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';
import { addUser } from '../../service/api';

const Component = styled(Box)`
    display : flex;
`

const Container = styled(Box)`
    padding : 56px 0px 56px 56px
`
//padding top right bottom left

const StyledList = styled(List)`
    & > li {
        padding : 0;
        margin-top : 15px;
        font-size : 18px;
        line-height : 20px;
        color : #4a4a4a;
    }
`

const Title = styled(Typography)`
    font-size : 26px;
    color : #525252;
    font-weight : 300;
    font-family : inherit;
    margin-bottom : 25px;
`

const QRCode = styled('img')({
    height : 264,
    width : 264,
    margin : '50px 0px 0px 50px'
})

const DialogStyle = {
    height : '96%',
    marginTop : '12%',
    width : '60%',
    maxWidth : '100%',
    maxHeight : '100%',
    boxShadow : 'none',
    overflow : 'hidden'
}

const LoginDialog = () => {
    const {setAccount} = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        const decoded = jwtDecode(res.credential)
        setAccount(decoded)
        await addUser(decoded);
    }

    const onLoginError = () => {

    }
    
    return (
        <Dialog
        open = {true}
        PaperProps={{sx : DialogStyle}}
        hideBackdrop = {true}
        >
            <Component>
                <Container>
                <Title>To use WhatsApp on your computer:</Title>
                <StyledList>
                    <ListItem>1. Open WhatsApp on your phone</ListItem>
                    <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
                    <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                </StyledList> 
                </Container>
                <Box style = {{position : 'relative'}}>
                <QRCode src = {qrCodeImage} alt = 'QR Code'/>
                <Box style = {{position:'absolute',top:'50%',transform: 'translateX(37%)'}}>
                    <GoogleLogin
                        onSuccess={onLoginSuccess}
                        onError={onLoginError}
                    />
                </Box>
                </Box>
            </Component>
        </Dialog>
    );
}

export default LoginDialog


