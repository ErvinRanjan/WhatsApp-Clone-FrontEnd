import Search  from "./Search";
import Header from "./Header";
import Conversations from "./Conversations";
import {Box} from '@mui/material';
import { useState } from 'react';

const Menu = () => {
    const [text,setText] = useState('');

    return (
        <Box>
        <Header/>
        <Search SetText = {setText}/>
        <Conversations Text = {text} />
        </Box>
    );
} 

export default Menu;