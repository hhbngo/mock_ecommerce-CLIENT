import React from 'react';
import { Link } from 'react-router-dom';
import classes from './CategoryCard.module.css';

const CategoryCard = ({category}) => (
    <div 
    className={classes.categories_card} 
    style={{backgroundImage: `url('${category.imgLink}')`}}
    >
        <Link to={`/shop/${category.slug}`}>
            <div className={classes.card_overlay}>
                <p>{category.name}</p>
            </div>
        </Link>
    </div>
);

export default CategoryCard;