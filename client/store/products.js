import axios from 'axios'

//ACTION TYPE
const SET_PRODUCTS = 'SET_PRODUCTS'

//ACTION CREATORS
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

//THUNK CREATORS
export const fetchProducts = () => {
  console.log('testing blue thunk')
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/products')
      dispatch(setProducts(products))
    } catch (err) {
      console.log('Error fetching products from API.', err)
    }
  }
}

//INITIAL STATE
const initialState = []

//REDUCER
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      console.log('in reducer', state, 'action.products-->', action.type)
      return action.products
    default:
      return state
  }
}

export default productsReducer
