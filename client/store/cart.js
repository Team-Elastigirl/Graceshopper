import axios from 'axios'

//ACTION TYPE
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

//ACTION CREATORS

export const gotCart = cart => ({
  type: GET_CART,
  cart
})

export const addedToCart = product => ({
  type: ADD_TO_CART,
  product
  // quantityAdded
})

export const removedFromCart = productId => ({
  type: REMOVE_FROM_CART,
  productId
})

//THUNK CREATOR args: productId, quantity , unitPrice, userId
export const addToCart = (
  id,
  {quantity, unitPrice, userId}
) => async dispatch => {
  try {
    console.log(`Adding Product #${id} to cart`)
    const {data: product} = await axios.post(`api/cart/add/${id}`, {
      quantity: quantity,
      unitPrice: unitPrice,
      userId: userId
    })
    return dispatch(addedToCart(product))
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

//INITIAL STATE
// const initialState = {
//   addedItems: [
//     {
//       id: 1,
//       name: 'Orion',
//       description:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
//       price: 100,
//       quantity: 10,
//       imageUrl:
//         'https://cdn.britannica.com/09/91709-050-FC3BB387/Sky-view-constellation-Orion.jpg',
//       location: 'space'
//     },
//     {
//       id: 2,
//       name: 'Little Dipper',
//       description:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
//       price: 50,
//       quantity: 5,
//       imageUrl:
//         'http://www.wikihow.com/images/b/be/Find-the-Little-Dipper-Step-7.jpg',
//       location: 'space'
//     }
//   ],
//   subtotal: 1250
// }
// Reducer

const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      return [...action.cart]
    }
    case ADD_TO_CART: {
      return [...state, action.product]
    }
    case REMOVE_FROM_CART: {
      return state.filter(product => product.id !== action.productId)
    }
    default: {
      return state
    }
  }
}

//REDUCER
// const cart2Reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       let existed_item = state.addedItems.find(
//         item => action.product.id === item.id
//       )

//       // add total product price to subtotal
//       // let newTotal = state.subtotal + action.product.price*action.quantityAdded
//       let newTotal = state.subtotal + action.product.price // only add 1 at a time

//       // add quantity to existing item
//       if (existed_item) {
//         // finds existing item and adds quantity
//         return {
//           ...state,
//           addedItems: state.addedItems.map(item => {
//             if (item.id === action.product.id) item.quantity++
//             // item.quantity += action.quantityAdded
//           }),
//           subtotal: newTotal
//         }
//       } else {
//         // add new item to cart
//         // adds new product with quantity added by user
//         // let addProduct = {...action.product, quantity: action.quantityAdded}
//         let addProduct = {...action.product, quantity: 1}
//         console.log('ADDED PRODUCT', action.product)
//         return {
//           ...state,
//           addedItems: [...state.addedItems].push(addProduct),
//           subtotal: newTotal
//         }
//       }
//     case REMOVE_FROM_CART:
//       let removedItem = state.addedItems.find(
//         item => action.productId === item.id
//       )
//       let removeFromTotal =
//         state.subtotal - removedItem.quantity * removedItem.price
//       return {
//         ...state,
//         addedItems: state.addedItems.filter(
//           item => item.id !== action.productId
//         ),
//         subtotal: removeFromTotal
//       }
//     default:
//       return state
//   }
// }

export default cartReducer
