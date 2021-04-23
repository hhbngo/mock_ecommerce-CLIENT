import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import {currentAdmin} from '../functions/auth';

import Loading from '../components/Loading/Loading';

const AdminRoute = ({user, component: Component, ...rest}) => {
    let dispatch = useDispatch();
    const [ok, setOk] = useState(null);

    useEffect(() => {
            currentAdmin(user.token)
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

export default AdminRoute;