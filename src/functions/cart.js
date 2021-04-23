import axios from 'axios';
const {REACT_APP_API} = process.env;

export const addItemToCart = async(payload, token) => await
    axios.post(`${REACT_APP_API}/cart/add`, payload, {
        headers: {
            authtoken: token
        }
});

export const getUserBag = async (token) => await axios.get(`${REACT_APP_API}/cart/user`, {
        headers: {
            authtoken: token
        }
    }
);

export const removeItemFromCart = async(id, token) => 
    await axios.patch(`${REACT_APP_API}/cart/remove`, {id}, {
        headers: {
            authtoken: token
        }
});