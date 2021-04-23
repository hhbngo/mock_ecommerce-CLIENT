import axios from 'axios';
const {REACT_APP_API} = process.env;

export const stripeCheckoutSuccess = async(sess, token) => {
    return await axios.post(`${REACT_APP_API}/stripe/order/success/${sess}`, {} ,{
        headers: {
            authtoken: token
        }
    });
};