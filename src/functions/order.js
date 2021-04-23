import axios from 'axios';
const {REACT_APP_API} = process.env;

export const getUserOrders = async (token) => await axios.get(`${REACT_APP_API}/user/orders`, {
    headers: {
        authtoken: token
    }
});

export const getAllOrders = async (token) => await axios.get(`${REACT_APP_API}/admin/orders`, {
    headers: {
        authtoken: token
    }
});

export const updateOrderStatus = async (id, status, token) => await axios.patch(`${REACT_APP_API}/order/status`, {id, status}, {
    headers: {
        authtoken: token
    }
});