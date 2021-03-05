import axios from 'axios'

//action type
const CREATE_PRODUCT = 'CREATE_PRODUCT'

//action creator
export const createProduct = newProduct => ({
  type: CREATE_PRODUCT,
  newProduct
})

//thunk
export const fetchCreatedProduct = newProduct => {
  return async dispatch => {
    try {
      const {data: addedProduct} = await axios.post('/api/products', newProduct)
      dispatch(createProduct(addedProduct))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []

//reducer
const adminProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return [...state, action.newProduct]
    default:
      return state
  }
}

export default adminProductReducer
