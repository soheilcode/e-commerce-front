export const initialState = {
    products: [],
    token: null
}
export const getCartTotal = (products) => {
    if (products.length > 0) {

        return products.reduce((total, product) => Number(product.price) * product.count + total, 0)
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            console.log(state.products)
            return {
                ...state,
                products: action.products,
            };
        case 'REMOVE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(product => product.id != action.id)
            }
        case 'SET_COUNT':

            const copy = [...state.products]
            const product = state.products.filter(product => product.id === action.id)[0]
            const index = state.products.indexOf(product)
            product.count = action.count
            copy.splice(index, 1, product)
            return {
                ...state,
                products: copy
            }
        case 'SET_TOKEN':
            //could have stored in localStorage (or even cookies)
            console.log(action)
            return {
                ...state,
                token: action.token
            }

        default:
            return state
    }
}

export default reducer;