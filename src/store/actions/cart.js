import { addItemToCart, removeItemFromCart, getUserBag } from '../../functions/cart';

export const restoreBag = (token) => {
    return async dispatch => {
        let bag = [];
        if (token) {
            const { data } =  await getUserBag(token);
            bag = data.products.map(el => {
                let { _id, title, imgLink, price, slug } = el.itemId;
                return {_id, title, quantity: el.quantity, imgLink, price, slug};
            });
            localStorage.setItem('bag', JSON.stringify(bag));
        } else {
            bag = JSON.parse(localStorage.getItem('bag') || '[]');
        }

        dispatch({type: 'SET_CART', payload: bag});
    }
}; 

export const addToBag = (added, token) => {
    return dispatch => {
        if (token) addItemToCart({id: added._id, quantity: added.quantity}, token);
        dispatch({type: 'ADD_ITEM', payload: added});
    }
};

export const removeFromBag = (id, token) => {
    return dispatch => {
        if (token) removeItemFromCart(id, token);
        dispatch({type: 'REMOVE_ITEM', payload: {id}});
    }
}

export const clearBag = () => {
    return dispatch => {
        localStorage.setItem('bag', '[]');
        dispatch({type: 'CLEAR_CART'});
    }
};
