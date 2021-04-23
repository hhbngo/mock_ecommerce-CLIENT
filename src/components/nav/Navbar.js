import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink, Link, useLocation } from 'react-router-dom';
import Scroll from 'react-scroll';
import Cart from '../Cart/Cart';
import classes from './Navbar.module.css'
import {MenuOutlined, ShoppingOutlined, CloseOutlined} from '@ant-design/icons'

const scroll = Scroll.animateScroll;

const Navbar = ({isAuth, role}) => {
    let dispatch = useDispatch();
    let location = useLocation();
    const [navOpen, setNavOpen] = useState(false);
    let { cart } = useSelector(state => ({...state}));

    useEffect(() => {
        if (navOpen) setNavOpen(false);
        if (cart.opened) dispatch({type: 'TOGGLE_CART'});
    }, [location])

    useEffect(() =>{
        scroll.scrollToBottom({containerId: 'cart-drawer', duration: 100});
    }, [cart.bag]);

    const toggleNav = (mode) => {
        switch (mode) {
            case 'nav':
                if (cart.opened) dispatch({type: 'TOGGLE_CART'});
                setNavOpen(!navOpen);                
                break;
            case 'cart':
                if (navOpen) setNavOpen(!navOpen);
                dispatch({type: 'TOGGLE_CART'});
                break;
            default:
                break;
        };
    };

    const onCloseHandler = () => {
        if (navOpen) return setNavOpen(false);
        dispatch({type: 'TOGGLE_CART'});
    };

    return <nav>
        <ul className={classes.menu}>
            <li className={classes.logo}><Link to="/home">MINI.M</Link></li>
            <li 
            className={classes.cart} 
            onClick={() => toggleNav('cart')} 
            >
                <ShoppingOutlined/>
            </li>
            <li 
            className={classes.toggle} 
            onClick={() => toggleNav('nav')} 
            >
                {navOpen ? <CloseOutlined/> : <MenuOutlined />}
            </li>
            <li className={classes.item}><NavLink to="/home">Home</NavLink></li>
            <li className={classes.item}><NavLink to="/shop">Shop</NavLink></li>
            {isAuth !== false 
                ?   [<li key="dash" className={classes.item}><NavLink to={role === 'admin' ? '/dashboard' : '/account'}>{role === 'admin' ? 'Dashboard' : 'Account'}</NavLink></li>,
                    <li key="logout" className={classes.item}><NavLink to="/logout">Log Out</NavLink></li>]
                :   <li className={classes.item}><NavLink to="/login">Login</NavLink></li>
            }
        </ul>
        <ul className={`${classes.mobile_menu} ${navOpen ? classes.active : ''}`}>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/shop">Shop</NavLink></li>
            {isAuth !== false 
                ?   [<li key="dash"><NavLink to={role === 'admin' ? '/dashboard' : '/account'}>{role === 'admin' ? 'Dashboard' : 'Account'}</NavLink></li>,
                    <li key="logout"><NavLink to="/logout">Log Out</NavLink></li>]
                :   [<li key="login"><NavLink to="/login">Login</NavLink></li>,
                    <li key="register"><NavLink to="/register">Register</NavLink></li>]
            }
        </ul>
        <div className={`${classes.cart_drawer} ${cart.opened ? classes.active : ''}`} id='cart-drawer'>
            <Cart cart={cart}/>
        </div>
        {navOpen || cart.opened ? <div className={classes.backdrop} onClick={onCloseHandler}></div> : null}
    </nav>
};

export default Navbar;