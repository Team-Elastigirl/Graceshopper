import axios from 'axios'

//action type
const GOT_PRODUCT = 'GOT_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

//action creator
export const gotProduct = product => ({
  type: GOT_PRODUCT,
  product
})

export const editProduct = updatedProduct => {
  return {
    type: EDIT_PRODUCT,
    updatedProduct
  }
}

//thunk
export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data: singleProduct} = await axios.get(
        `/api/products/${productId}`
      )
      dispatch(gotProduct(singleProduct))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateProduct = product => {
  return async dispatch => {
    try {
      const {data: updatedProduct} = await axios.put(
        `/api/products/${product.id}`,
        product
      )
      dispatch(editProduct(updatedProduct))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

//reducer

const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product
    case EDIT_PRODUCT:
      return action.updatedProduct
    default:
      return state
  }
}

export default singleProductReducer
