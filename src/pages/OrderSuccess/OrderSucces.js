import React, {useEffect, useState} from 'react';
import {useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { clearBag } from '../../store/actions/cart';
import { stripeCheckoutSuccess } from '../../functions/stripe';
import Loading from '../../components/Loading/Loading';
import classes from './OrderSucces.module.css';

const OrderSuccess = ({match}) => {
    let dispatch = useDispatch();
    let history = useHistory();
    const { auth } = useSelector(state => ({...state}));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        stripeCheckoutSuccess(match.params.sessionId, auth.token)
            .then(({data}) => {
                setLoading(false);
                dispatch(clearBag());
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        loading ? <Loading height='100vh'/>
        : <div className={classes.container}>
            <h1>Thank you for your order!</h1>
            <button onClick={() => history.push('/account/orders')}>View Order →</button>
        </div>
    );
};

export default OrderSuccess;
