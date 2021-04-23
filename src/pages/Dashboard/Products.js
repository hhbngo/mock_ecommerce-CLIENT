import React, { useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { getProducts, featureProduct, deleteProduct } from '../../functions/product';
import classes from './Dashboard.module.css';
import { Collapse, Pagination } from 'antd';
import { DeleteOutlined, StarOutlined, StarFilled, EditOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';

const { Panel } = Collapse;

let initialValues = [
    { name: 'T-shirts', slug: 't-shirts', items: [], page: 1, loaded: false },
    { name: 'Sweaters', slug: 'sweaters', items: [], page: 1, loaded: false },
    { name: 'Outerwear', slug: 'outerwear', items: [], page: 1, loaded: false },
    { name: 'Hats', slug: 'hats', items: [], page: 1, loaded: false },
    { name: 'Jewelry', slug: 'jewelry', items: [], page: 1, loaded: false },
    { name: 'Accessories', slug: 'accessories', items: [], page: 1, loaded: false }
]

const Products = ({user}) => {
    let history = useHistory();
    const [productsInfo, setProductsInfo] = useState(initialValues);

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const getCategoryItems = async (name) => {
        const selected = productsInfo.find( e => e.slug === name);
        if (name && !selected.loaded ) {
            const {data: items} = await getProducts(name);
            let productIndex = productsInfo.findIndex( e => e.slug === name);
            let copy = [...productsInfo];
            copy[productIndex] = {...selected, items, loaded: true};
            setProductsInfo(copy);
        }
    }
 
    const handlePageChange = (page, pageSize, index) => {
        let copy = [...productsInfo];
        copy[index] = {...productsInfo[index], page};
        setProductsInfo(copy);
    };

    const handleDelete = (id, title, categoryIndex) => {
        if (window.confirm(`Are you sure you want to delete '${title}'?`)) {
            deleteProduct(id, user.token)
            .then(res => {
                toast.success(`Deleted product '${title}'.`);
                let copy = [...productsInfo];
                copy[categoryIndex].items = copy[categoryIndex].items.filter(p => p._id !== id);
                setProductsInfo(copy);
            })
            .catch(err => {
                toast.error(err.message);
            });
        }
    };

    const handleFeature = (id, value, categoryIndex) => {
        featureProduct(id, value, user.token)
        .then(({data}) => {
            toast.success(`'${data.title}' was ${value ? 'added to' : 'removed from'} featured products.`);
            const productIndex = productsInfo[categoryIndex].items.findIndex(p => p._id === id);
            let copy = [...productsInfo];
            copy[categoryIndex].items[productIndex] = data;
            setProductsInfo(copy);
        })
        .catch(err => {
            toast.error(err.message);
        });
    };
 
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
            <h1>Products</h1>
            <Collapse 
                accordion 
                className={classes.product_list} 
                onChange={(e) => getCategoryItems(e)}
            >
                {productsInfo.map((c, i) => {
                    const pageFactor = (c.page - 1) * 4; 
                    return (
                        <Panel header={c.name} key={c.slug}>
                            <div style={{minHeight: '218px'}}>
                                {!c.loaded 
                                    ? <div style={{fontSize: '24px', paddingLeft: '5px'}}>Loading...</div> 
                                    : c.items.slice(0 + pageFactor, 4 + pageFactor).map(p => (
                                        <div className={classes.product_label} key={p._id}>
                                            <p>{p.title}</p>
                                            <div className={classes.product_interact}>
                                                <EditOutlined onClick={() => history.push(`/dashboard/edit/${p._id}`)}/>
                                                <DeleteOutlined onClick={() => handleDelete(p._id, p.title, i)}/>
                                                {p.featured 
                                                ? <StarFilled onClick={() => handleFeature(p._id, !p.featured, i)} />
                                                : <StarOutlined onClick={() => handleFeature(p._id, !p.featured, i)}/>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <Pagination 
                                current={c.page}
                                pageSize={4} 
                                total={c.items.length} 
                                style={{margin: '20px 0 5px'}}
                                onChange={(page, pageSize) => handlePageChange(page, pageSize, i)}
                            />
                        </Panel>
                    )
                })}
            </Collapse>
        </div>
    </div>
};

export default Products;
