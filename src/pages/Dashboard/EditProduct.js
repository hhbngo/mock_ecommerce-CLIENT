import React, {useEffect, useState} from 'react';
import useForm from '../../hooks/useForm';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import classes from './Dashboard.module.css';
import { getProductById, editProduct } from '../../functions/product';

let CATEGORIES = ['t-shirts', 'sweaters', 'outerwear', 'hats', 'jewelry', 'accessories'];

const initialValues = {
    title: '',
    category: 't-shirts',
    description: '',
    imgLink: '',
    price: 0,
    quantity: 0
};

const EditProduct = ({user}) => {
    let history = useHistory();
    const { id } = useParams();
    const [values, handleChange, setValues] = useForm(initialValues);
    const [loading, setLoading] = useState(true);
    const { title, category, description, imgLink, price, quantity } = values;

    useEffect(() => {
        window.scrollTo(0,0);
        getProductById(id)
        .then(({data}) => {
            const { title, category, description, imgLink, price, quantity } = data;
            setValues({ title, category, description, imgLink, price, quantity});
            setLoading(false);
        })
        .catch(err => {
            toast.error('Error: Could not find product');
            history.push('/dashboard/products');
        });
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        editProduct(id, values, user.token)
        .then(({data}) => {
            setLoading(false);
            toast.success(`Updated product '${data.title} successfully!'`);
            history.push('/dashboard/products');
        })
        .catch(err => {
            setLoading(false);
            toast.error('Error: Could not update product.')
        })
    }

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
            <h1>{loading ? 'Loading...' : 'Edit Product'}</h1>
            <form className={classes.create_form} onSubmit={handleSubmit}>
                <label>Title</label>
                <input 
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                disabled={loading}
                required
                />
                <label>Category</label>
                <select
                name="category"
                value={category}
                onChange={handleChange}
                disabled={loading}
                >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                </select>
                <label>Description</label>
                <textarea 
                name="description"
                value={description}
                onChange={handleChange}
                disabled={loading}
                />
                <label>Image Link</label>
                <input 
                type="text"
                name="imgLink"
                value={imgLink}
                onChange={handleChange}
                disabled={loading}
                />
                <label>Price</label>
                <input 
                type="text"
                name="price"
                value={price}
                min={0}
                onChange={handleChange}
                disabled={loading}
                />
                <label>Quantity</label>
                <input 
                type="number"
                name="quantity"
                value={quantity}
                min={0}
                onChange={handleChange}
                disabled={loading}
                />
                {!loading && <button 
                type="submit"
                >
                    Save
                </button>}
            </form>
        </div>
    </div>
};

export default EditProduct;