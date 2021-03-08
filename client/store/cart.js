import axios from 'axios'
//axios.defaults.baseURL = 'http://localhost:8080'

//ACTION TYPE
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

//ACTION CREATORS

export const gotCart = cart => ({
  type: GET_CART,
  cart
})

export const addedToCart = (product, orderId) => ({
  type: ADD_TO_CART,
  product,
  orderId
  // quantityAdded
})

export const removedFromCart = productId => ({
  type: REMOVE_FROM_CART,
  productId
})

//THUNK CREATOR args: productId, quantity , unitPrice, userId
export const addToCart = (product, userId) => async dispatch => {
  try {
    console.log(`Adding Product #${product.id} to cart`)
    const {data: foundProduct} = await axios.post(
      `api/cart/add/${product.id}`,
      {
        quantity: product.quantity,
        unitPrice: product.price,
        userId: userId ? userId : 0
      }
    )
    console.log('outputs', foundProduct)
    return dispatch(addedToCart(product, foundProduct.orderId))
  } catch (err) {
    console.log('Error adding to cart.', err)
  }
}

export const removeFromCart = (id, orderId) => {
  return async dispatch => {
    try {
      console.log('REMOVE FROM CART THUNK')
      await axios.delete(`api/cart/${id}/${orderId}`)
      dispatch(removedFromCart(id))
    } catch (err) {
      console.log('Error removing from cart.', err)
    }
  }
}

export const getCart = id => {
  const url = id ? `api/cart?userId=${id}` : `api/cart`
  return async dispatch => {
    try {
      const cart = await axios.get(url)
      console.log('cart reducer', cart)
      dispatch(gotCart(cart.data))
    } catch (err) {
      console.log('Error getting the cart', err)
    }
  }
}

// Reducer

const initialState = {
  cart: [],
  orderId: 0
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      return {
        cart: [...action.cart],
        orderId: action.orderId
      }
    }
    case ADD_TO_CART: {
      return {
        cart: [...state.cart, action.product],
        orderId: action.orderId
      }
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.productId)
      }
    }
    default: {
      return state
    }
  }
}

export default cartReducer
