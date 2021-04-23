import { combineReducers } from 'redux';
import authReducer from './auth';
import cartReducer from './cart';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer
});

export default rootReducer;
