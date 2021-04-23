import React from 'react';
import {Link} from 'react-router-dom'
import classes from './ProductCard.module.css';

const ProductCard = ({product: p}) => 
    <div className={classes.container}>
        <Link to={`/product/${p.slug}`}>
        <img src={p.imgLink} alt="asdasd"/>
        </Link>
        <Link to={`/product/${p.slug}`}>
        <div className={classes.info}>
        <span>{p.title}</span>
        </div>
        <div>
        <p className={classes.price}>${Number(p.price).toFixed(2)}</p>
        </div>
        </Link>
</div>

export default ProductCard;