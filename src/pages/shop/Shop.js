import React, {useEffect, useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import classes from './Shop.module.css';
import {MenuOutlined, AppstoreOutlined} from '@ant-design/icons'
import ProductCard from './ProductCard/ProductCard';
import Loading from '../../components/Loading/Loading';
import { getProducts } from '../../functions/product';

const Shop = ({match}) => {
    let history = useHistory();
    let { category } = match.params;
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0,0);
        if (!category) return history.push('/shop/featured');
        setLoading(true);
        getProducts(category)
        .then(({data}) => {
            setLoading(false);
            setProducts(data);
        })
    }, [category]);

    return <div className={classes.container}>
        <div className={classes.sidebar}>
            <div className={classes.categories}>
                <h1>Categories</h1>
                <ul>
                    <li><NavLink to="/shop/featured">Featured</NavLink></li>
                    <li><NavLink to="/shop/t-shirts">T-shirts</NavLink></li>
                    <li><NavLink to="/shop/sweaters">Sweaters</NavLink></li>
                    <li><NavLink to="/shop/outerwear">Outerwear</NavLink></li>
                    <li><NavLink to="/shop/hats">Hats</NavLink></li>
                    <li><NavLink to="/shop/jewelry">Jewelry</NavLink></li>
                    <li><NavLink to="/shop/accessories">Accessories</NavLink></li>
                </ul>
            </div>
        </div>
        <div className={classes.main}>
            <div className={classes.sortbar}>
                <select>
                    <option disabled>Sort by...</option>
                    <option value="">Price (high to low)</option>
                    <option value="">Price (low to high)</option>
                    <option value="">Rating (high to low)</option>
                    <option value="">Rating (low to high)</option>
                </select>
                <p>View:</p>
                <MenuOutlined/>
                <AppstoreOutlined />
            </div>
            {loading
                ? <Loading height="35vh"/> 
                : <div className={classes.showcase}>
                    {products.length === 0 ? <p style={{padding: '10px'}}>No products currently listed.</p> :
                    products.map(p => <ProductCard key={p._id} product={p}/>)}
                </div>
            }
        </div>
    </div>
};

export default Shop;