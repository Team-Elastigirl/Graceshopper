import axios from 'axios'

//action type
const GOT_PRODUCT = 'GOT_PRODUCT'

//action creator
export const gotProduct = product => ({
  type: GOT_PRODUCT,
  product
})

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

const initialState = {}

//reducer

const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProductReducer
