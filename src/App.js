import Messenger from './components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './components/context/AccountProvider';

function App() {
  const clientId = '853008609822-882pskr5nugstubskcmaj8a8kn07kila.apps.googleusercontent.com'
  return (
    <GoogleOAuthProvider clientId = {clientId}>
      <AccountProvider>
      <Messenger/>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
