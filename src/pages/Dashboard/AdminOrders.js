import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import classes from './Dashboard.module.css';
import { getAllOrders, updateOrderStatus } from '../../functions/order';
import OrderCard from '../../components/OrderCard/OrderCard';

const AdminOrders = ({user}) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllOrders(user.token)
        .then(res => {
            setLoading(false);
            setOrders(res.data);
        })
        .catch(err => {
            setLoading(false);
        })
    }, []);

    const handleStatusChange = async (e, id) => {
        updateOrderStatus(id, e.target.value, user.token)
            .then(() => {
                toast.success(`Updated order status to '${e.target.value}' successfully!`);
            })
            .catch(() => {
                toast.error('Could not update order status');
            })
    };

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
            <h1 style={{marginBottom: '20px'}}>{loading ? 'Loading...' : 'All Orders'}</h1>
            {orders.map((o, i) => <OrderCard key={i} order={o} handleStatusChange={handleStatusChange} admin/>)}
        </div>
    </div>
};

export default AdminOrders;