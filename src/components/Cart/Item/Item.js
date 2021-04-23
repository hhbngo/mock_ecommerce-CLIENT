import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Item.module.css';
import {DeleteOutlined} from '@ant-design/icons'

const Item = ({product, handleRemove}) => {
    const {_id, title, imgLink, quantity, price, slug} = product;
    return (
        <div className={classes.container}>
            <Link to={`/product/${slug}`}>
                        <img 
                src={imgLink}
                alt="product img"
            /> 
            </Link>
            <div className={classes.description}>
                <Link to={`/product/${slug}`}><h3>{title}</h3></Link>
                <p>Qty: {quantity}</p>
                <h5>${(quantity * price).toFixed(2)}</h5>
            </div>
            <DeleteOutlined 
                className={classes.bottom}
                onClick={() => handleRemove(_id)}
            />
        </div>
    )
};

export default Item;