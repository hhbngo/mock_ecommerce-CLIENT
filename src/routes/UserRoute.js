import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import {currentUser} from '../functions/auth';

import Loading from '../components/Loading/Loading';

const UserRoute = ({user, component: Component, ...rest}) => {
    let dispatch = useDispatch();
    const [ok, setOk] = useState(null);

    useEffect(() => {
            currentUser(user.token)
            .then(res => {
                setOk(true);
            })
            .catch(err => {
                dispatch({type: 'AUTH_FALSE'});
            })

    }, [user]);

    return (
        <Route
            {...rest}
            render={() => {
                if (ok) return <Component user={user}/>;
                return <Loading height='100vh'/>;
            }}
        />
    )
};

export default UserRoute;