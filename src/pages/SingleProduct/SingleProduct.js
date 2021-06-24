import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductBySlug } from '../../functions/product';
import { addToBag } from '../../store/actions/cart';
import Loading from '../../components/Loading/Loading';
import classes from './SingleProduct.module.css';

const SingleProduct = ({match}) => {
    let dispatch = useDispatch();
    const { auth } = useSelector(state => ({...state}));
    const { slug } = match.params;
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [tab, setTab] = useState('About');

    useEffect(() => {
        window.scrollTo(0,0);
        getProductBySlug(slug)
        .then(({data}) => {
            setProduct(data);
        })
        .catch(err => {

        })
    }, [slug]);

    const handleAddToCart = () => {
        const num = parseInt(qty);
        if (typeof num !== 'number' || num < 1) return alert('Invalid quantity!') 
        dispatch(addToBag({...product, quantity: parseInt(qty)}, auth.token));
    }

    return <>
    {product 
    ? <div className={classes.container}>
            <h1 className={classes.title}>{product.title}</h1>
            <div className={classes.image}>
                <img src={product.imgLink} alt="asdasd"/>
            </div>
            <p className={classes.price}>${Number(product.price).toFixed(2)}</p>
            <div className={classes.interacts}>
                <input 
                type="number"
                placeholder="QTY"
                value={qty}
                min={1}
                onChange={e => setQty(e.target.value)}
                />
                <button 
                className={`${classes.btn} ${classes.secondary}`}
                onClick={handleAddToCart}
                >Add to cart</button>
            </div>
            <div className={classes.info}>
                <div className={classes.tabs}>
                    {['About', 'Reviews'].map(t => <p 
                    className={tab === t ? classes.active : ' '} 
                    key={t} 
                    onClick={() => setTab(t)}>{t}
                    </p>)}
                </div>
                <div className={classes.text_block}>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
    </div>
    : <Loading height="100vh"/>}
    </>
    
};

export default SingleProduct;

// SET UP SERVER CODE FOR STRIPE