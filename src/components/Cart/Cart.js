import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Item from './Item/Item';
import classes from './Cart.module.css';
import { removeFromBag } from '../../store/actions/cart';
import { LoadingOutlined } from '@ant-design/icons'
const {REACT_APP_STRIPE_PUBLISH_KEY, REACT_APP_API} = process.env;

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISH_KEY);

const Cart = ({cart}) => {
    const { bag, total } = cart;
    const [ loading, setLoading ] = useState(false); 
    let dispatch = useDispatch();
    let history = useHistory();
    let { auth } = useSelector(state => ({...state}));

    const handleRemoveItem = (itemId) => dispatch(removeFromBag(itemId, auth.token));

    const handleGoToCheckout = async() => {
        if (!auth) return history.push('/login');

        setLoading(true)
        const stripe = await stripePromise;
        const response = await fetch(`${REACT_APP_API}/stripe/create-checkout-session`, {
            method: 'POST',
            headers: {
                authtoken: auth.token
            }
        });
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log('Checkout error');
        }
    }
    
    return <div className={classes.container}>
        <h1>SHOPPING CART</h1>
        {bag.map(p => (
            <Item 
            key={p._id} 
            product={p}
            handleRemove={handleRemoveItem}
            />
        )
        )}
        {bag.length > 0 ? <p 
            style={{
                float: 'right',
                margin: '12px 4px 0 0',
                fontSize: '18px',
                borderBottom: '1px solid rgb(226, 226, 226)'
            }}
        >
            <span>Total: </span>${total.toFixed(2)}
        </p>: null}
        {bag.length > 0 ?
        <div className={classes.interacts}>
            <button onClick={handleGoToCheckout}>{loading ? <LoadingOutlined/> : auth ? 'Checkout' :  'Log In to checkout'}</button>
            <button onClick={() => dispatch({type: 'TOGGLE_CART'})}>Continue Shopping</button>
        </div> : null}
    </div>
};

export default Cart;


