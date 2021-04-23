import axios from 'axios';
const {REACT_APP_API} = process.env;

export const getProducts = async (category) =>  await axios.get(`${REACT_APP_API}/products/${category}`);

export const getProductById = async (id) => await axios.get(`${REACT_APP_API}/product/${id}`);

export const getProductBySlug = async (slug) => await axios.get(`${REACT_APP_API}/view/${slug}`);

export const createProduct = async (p, token) => {
    return await axios.post(`${REACT_APP_API}/product-create`, p, {
        headers: {
            authtoken: token
        }
    });
};

export const editProduct = async (id, values, token) => {
    return await axios.patch(`${REACT_APP_API}/product-edit/${id}`, values, {
        headers: {
            authtoken: token
        }
    });
}

export const featureProduct = async (id, value, token) => {
    return await axios.patch(`${REACT_APP_API}/product-feature/${id}`, {value}, {
        headers: {
            authtoken: token
        }
    });
};

export const deleteProduct = async (id, token) => {
    return await axios.delete(`${REACT_APP_API}/product-delete/${id}`, {
        headers: {
            authtoken: token
        }
    });
}