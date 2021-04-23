const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_SUCCESS': return action.payload;
        case 'AUTH_FALSE': return false;
        case 'AUTH_LOGOUT': return initialState;
        default: return state;
    }
};

export default reducer;