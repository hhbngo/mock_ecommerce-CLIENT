import axios from 'axios';
const {REACT_APP_API} = process.env;

export const createUser = async (token) => {
    return await axios.post(`${REACT_APP_API}/create-user`, {}, {
        headers: {
            authtoken: token
        }
    });
};

export const currentUser = async (token) => {
    return await axios.post(`${REACT_APP_API}/current-user`, {}, {
        headers: {
            authtoken: token
        }
    });
};

export const currentAdmin = async (token) => {
    return await axios.post(`${REACT_APP_API}/current-admin`, {}, {
        headers: {
            authtoken: token
        }
    });
};