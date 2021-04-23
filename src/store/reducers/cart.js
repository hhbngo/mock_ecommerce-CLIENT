const initialState = {
    bag: [],
    total: 0,
    opened: false
};

const sumUpBag = (bag) => bag.reduce((a, b) => a + b.quantity * b.price, 0);


const addItem = (state, action) => {
    const { bag } = state; 
    const { _id, title, quantity, imgLink, price, slug } = action.payload;
    let existingItem = bag.find(el => el._id === _id);
    let newBag = [...bag];

    if (existingItem) {
        let itemIndex = bag.findIndex(el => el._id === _id);
        newBag[itemIndex].quantity += quantity;
    } else {
        newBag.push({
            _id,
            title,
            quantity,
            imgLink, 
            price,
            slug
        })
    }
    let newTotal = sumUpBag(newBag);
    localStorage.setItem('bag', JSON.stringify(newBag));
    return {...state, opened: true, bag: newBag, total: newTotal}; 
};

const removeItem = (state, action) => {
    const { bag } = state;  
    let newBag = [...bag].filter(el => el._id !== action.payload.id);
    let newTotal = sumUpBag(newBag);
    localStorage.setItem('bag', JSON.stringify(newBag));
    return {...state, bag: newBag, total: newTotal}; 
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_CART': return {...state, opened: !state.opened}
        case 'SET_CART': return {...state, bag: action.payload, total: sumUpBag(action.payload)};
        case 'ADD_ITEM': return addItem(state, action);
        case 'REMOVE_ITEM': return removeItem(state, action);
        case 'CLEAR_CART': return {...state, bag: []}
        default:
            return state;
    }
};

export default reducer;