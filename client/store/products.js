import axios from 'axios'

//ACTION TYPE
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//ACTION CREATORS
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const addProduct = newProduct => {
  return {
    type: ADD_PRODUCT,
    newProduct
  }
}

export const deletedProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId
  }
}

//THUNK CREATORS
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/products')
      dispatch(setProducts(products))
    } catch (err) {
      console.log('Error fetching products from API.', err)
    }
  }
}

export const postProduct = product => {
  return async dispatch => {
    try {
      const {data: newProduct} = await axios.post('/api/products/', product)
      dispatch(addProduct(newProduct))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deletedProduct(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

//INITIAL STATE
const initialState = []

//REDUCER
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.newProduct]
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}

export default productsReducer
