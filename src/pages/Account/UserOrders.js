import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom'
import { getUserOrders } from '../../functions/order';
import classes from '../Dashboard/Dashboard.module.css';
import OrderCard from '../../components/OrderCard/OrderCard';

const UserOrders = ({user}) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUserOrders(user.token)
        .then(res => {
            setLoading(false);
            setOrders(res.data);
        })
        .catch(err => {
            setLoading(false);
        })
    }, []);

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
            <h1 style={{marginBottom: '20px'}}>{loading ? 'Loading...' : 'All Orders'}</h1>
            {orders.length ? orders.map((o, i) => <OrderCard key={i} order={o}/>) : 'No orders yet.'}
        </div>
    </div>
};

export default UserOrders;