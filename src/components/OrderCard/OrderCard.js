import React from 'react';
import moment from 'moment';
import { Card } from 'antd';

const OPTIONS = ['Processing', 'Preparing', 'Shipped', 'Delivered'];

const OrderCard = ({admin, order, handleStatusChange}) => {
    const { _id, products, status, total, postedBy, createdAt } = order;
    const orderDate = moment(createdAt).format('MM/DD/YYYY');

    return (
        <Card
        size='small'
        type='inner' 
        title={admin ? `${postedBy.email} - ${orderDate}` : orderDate}
        extra={admin ?
            <select 
            onChange={(e) => handleStatusChange(e, _id)} 
            style={{padding: '3px', borderRadius: '3px', fontSize: '16px'}}
            defaultValue={status} 
            >
                {OPTIONS.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
            </select> : 
            <h3 style={{margin: 0}}>{status}</h3>
        }
        headStyle={{padding: '3px 20px', textTransform: 'uppercase'}}
        bodyStyle={{padding: '15px 20px 5px'}}
        style={{marginBottom: '25px'}}
        >
            {products.map(p => <p key={p._id}>{p.title} X {p.quantity} : ${(p.price*p.quantity).toFixed(2)}</p>)}
            <h3 style={{float: 'right', marginRight: '10px'}}>TOTAL: ${total.toFixed(2)}</h3>
        </Card>
    )
};

export default OrderCard;