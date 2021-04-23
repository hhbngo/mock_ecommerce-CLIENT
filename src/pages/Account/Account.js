import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import classes from '../Dashboard/Dashboard.module.css';

const Account = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    return <div className={classes.container}>
        <div className={classes.sidebar}>
            <div className={classes.categories}>
                <h1>Account</h1>
                <ul>
                    <li><NavLink to="/account/main">Main</NavLink></li>
                    <li><NavLink to="/account/orders">Orders</NavLink></li>
                    <li><NavLink to="/account/password">Password</NavLink></li>
                </ul>
            </div>
        </div>
        <div className={classes.main}>
            <h1>Account</h1>
        </div>
    </div>
};

export default Account;