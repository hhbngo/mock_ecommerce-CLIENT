import React from 'react';
import {useHistory} from 'react-router-dom';
import classes from './Home.module.css';
import CategoryCard from './CategoryCards/CategoryCard';

const CATEGORY_MOCK = [
    {
        name: 'T-shirts',
        slug: 't-shirts',
        imgLink: 'https://i.imgur.com/D6C7KWV.jpg',
        _id: '2KTQ6Pj8XO'
    },
    {
        name: 'Sweaters',
        slug: 'sweaters',
        imgLink: 'https://i.imgur.com/AIC1GRM.jpg',
        _id: '3mTKNSNTrf'
    },
    {
        name: 'Outerwear',
        slug: 'outerwear',
        imgLink: 'https://i.imgur.com/TzpYfXH.jpg',
        _id: 'DvdnEDDTx0'
    },
    {
        name: 'Hats',
        slug: 'hats',
        imgLink: 'https://i.imgur.com/XIOf3WD.jpg',
        _id: 'xS0h5SR6bW'
    },
    {
        name: 'Jewelry',
        slug: 'jewelry',
        imgLink: 'https://i.imgur.com/B5IXG17.jpg',
        _id: 'Q2iPCLEyj7'
    },
    {
        name: 'Accessories',
        slug: 'accessories',
        imgLink: 'https://i.imgur.com/9loa6wC.jpg',
        _id: 'SsFzLNI_ea'
    },
]

const Home = () => {
    let history = useHistory();

    return <div className={classes.container}>
        <div className={classes.banner}>
            <div className={classes.pic}>
                <img src="assets/images/heroResized.jpg"
                 alt="hero" 
                 className={classes.hero_img}/>
            </div>
            <div className={classes.desc}>
                <h1>Stylish, Simple.</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet officia recusandae placeat sit veniam. Illo quis praesentium nisi nemo, maxime rerum ab quam atque aut iste incidunt quos? Ipsam, beatae!</p>
            </div>
        </div>
        <div className={classes.featured}>
            <h1>Categories</h1>
            <div className={classes.categories_container}>
                {CATEGORY_MOCK.map(c => <CategoryCard category={c} key={c._id}/>)}
            </div>
            <button className={classes.btn} onClick={() => history.push('/shop/featured')}>Shop All</button>
        </div>

    </div>
}

export default Home;