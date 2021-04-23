import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import classes from './Dashboard.module.css';

const Dashboard = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    return <div className={classes.container}>
        <div className={classes.sidebar}>
            <div className={classes.categories}>
                <h1>Dashboard</h1>
                <ul>
                    <li><NavLink to="/dashboard/main">Main</NavLink></li>
                    <li><NavLink to="/dashboard/products">Products</NavLink></li>
                    <li><NavLink to="/dashboard/create">Create</NavLink></li>
                    <li><NavLink to="/dashboard/orders">Orders</NavLink></li>
                </ul>
            </div>
        </div>
        <div className={classes.main}>
            <h1>Main Dash</h1>
        </div>
    </div>
};

export default Dashboard;