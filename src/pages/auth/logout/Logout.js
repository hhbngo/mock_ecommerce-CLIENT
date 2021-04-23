import React, {useEffect} from 'react';
import Loading from '../../../components/Loading/Loading';
import { auth } from '../../../firebase';

const Logout = () => {
    
    useEffect(() => {
        auth.signOut();
    }, []);

    return <Loading height="100vh"/>
};

export default Logout;