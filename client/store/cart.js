import axios from 'axios'
//axios.defaults.baseURL = 'http://localhost:8080'

//ACTION TYPE
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_AMOUNT = 'UPDATE_AMOUNT'

//ACTION CREATORS

export const gotCart = cart => ({
  type: GET_CART,
  cart
})

export const addedToCart = (product, amount, orderId) => ({
  type: ADD_TO_CART,
  product,
  amount,
  orderId
  // quantityAdded
})

export const removedFromCart = productId => ({
  type: REMOVE_FROM_CART,
  productId
})

export const updatedAmount = (productId, amount) => ({
  type: UPDATE_AMOUNT,
  productId,
  amount
})

//THUNK CREATOR args: productId, quantity , unitPrice, userId
export const addToCart = (product, userId) => async dispatch => {
  try {
    console.log(`Adding Product #${product.id} to cart`)
    const {data: foundProduct} = await axios.post(
      `/api/cart/add/${product.id}`,
      {
        quantity: product.quantity,
        unitPrice: product.price,
        userId: userId ? userId : 0
      }
    )
    console.log('amount', foundProduct.amount)
    return dispatch(
      addedToCart(product, foundProduct.amount, foundProduct.orderId)
    )
  } catch (err) {
    console.log('Error adding to cart.', err)
  }
}

export const removeFromCart = (id, orderId) => {
  return async dispatch => {
    try {
      const cart = await axios.delete(`api/cart/${id}/${orderId}`)
      dispatch(removedFromCart(id))
    } catch (err) {
      console.log('Error removing from cart.', err)
    }
  }
}

export const updateAmount = (productId, amount, orderId) => {
  return async dispatch => {
    try {
      console.log('UPDATE THUNK props', amount, orderId)
      const {data: updated} = await axios.put(`api/cart/${productId}`, {
        amount: amount,
        orderId: orderId
      })
      dispatch(updatedAmount(productId, amount))
    } catch (err) {
      console.log('Error updating amount.', err)
    }
  }
}

export const getCart = id => {
  // const url = id ? `api/cart?userId=${id}` : `api/cart`
  return async dispatch => {
    try {
      console.log('get thunk userid', typeof id, id)
      const {data: cart} = await axios.get(`api/cart/${id}`)
      console.log('GET CART cart reducer', cart)
      dispatch(gotCart(cart.cart, cart.orderId))
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
      console.log('AMOUNT', action.amount)
      const newItem = {...action.product, amount: action.amount}
      console.log('NEW ITEM', newItem)
      return {
        cart: [...state.cart, newItem],
        orderId: action.orderId
      }
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.productId)
      }
    }
    case UPDATE_AMOUNT: {
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.productId) item.amount = action.amount
          return item
        })
      }
    }
    default: {
      return state
    }
  }
}

export default cartReducer
