import React, {useEffect} from 'react';
import useForm from '../../hooks/useForm';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import classes from './Dashboard.module.css';
import { createProduct } from '../../functions/product';

const initialValues = {
    title: '',
    category: 't-shirts',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam obcaecati voluptates saepe, blanditiis nesciunt illo dicta eligendi omnis officiis pariatur dolorum iure non ducimus doloremque accusantium assumenda. Blanditiis, quas sit!',
    imgLink: '',
    price: 25.00,
    quantity: 30
};

let CATEGORIES = ['t-shirts', 'sweaters', 'outerwear', 'hats', 'jewelry', 'accessories'];

const CreateProduct = ({user}) => {
    const [values, handleChange] = useForm(initialValues);
    const { title, category, description, imgLink, price, quantity } = values;

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        createProduct(values, user.token)
        .then(({data}) => {
            toast.success(`Successfully created product '${data.title}'`);
        })
        .catch(err => {
                toast.error('Product create failed.')
        })
    }

    const generateMassProducts = e => {
        e.preventDefault();

        for(let i = 1; i < 8; i++) {
            createProduct({...values, title: `${category} ${i}`}, user.token)
            .then(({data}) => {
                toast.success(`Successfully created product '${data.title}'`);
            })
            .catch(err => {
                    toast.error('Product create failed.')
            })
        }
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
            <h1>Create Product</h1>
            <form className={classes.create_form} onSubmit={handleSubmit}>
                <label>Title</label>
                <input 
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                required
                />
                <label>Category</label>
                <select
                name="category"
                value={category}
                onChange={handleChange}
                >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                </select>
                <label>Description</label>
                <textarea 
                name="description"
                value={description}
                onChange={handleChange}
                />
                <label>Image Link</label>
                <input 
                type="text"
                name="imgLink"
                value={imgLink}
                onChange={handleChange}
                />
                <label>Price</label>
                <input 
                type="text"
                name="price"
                value={price}
                min={0}
                onChange={handleChange}
                />
                <label>Quantity</label>
                <input 
                type="number"
                name="quantity"
                value={quantity}
                min={0}
                onChange={handleChange}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    </div>
};

export default CreateProduct;