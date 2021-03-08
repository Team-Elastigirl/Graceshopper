import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartItem from './CartItem'
import {getCart} from '../store/cart'

/**
 * COMPONENT
 */
export class Cart extends React.Component {
  // constructor(props) {
  //   super(props)

  // this.generateCart = this.generateCart.bind(this)
  // }

  async componentDidMount() {
    const userId = this.props.user ? this.props.user.id : null
    console.log('props on the cart', this.props)
    await this.props.getCart(userId)
  }

  // combines booking and product obj
  // generateCart() {
  //   return this.props.cart.map(item => {
  //     const product = this.props.products.find(
  //       elem => item.productId === elem.id
  //     )
  //     return {...product, ...item}
  //   })
  // }

  render() {
    const cart = this.props.cartObj.cart
    console.log('CART76', this)
    return (
      <div>
        <h2>Cart Items</h2>
        <div>
          {cart.map(item => {
            return <CartItem key={item.id} cartItem={item} />
          })}
        </div>
        <h3>
          Subtotal: ${cart.reduce((accum, item) => {
            return accum + item.price * 10
          }, 0)}
        </h3>
        <Link to="/checkout">
          <button>CHECKOUT</button>
        </Link>
      </div>
    )
  }
}
const mapState = state => {
  return {
    cartObj: state.cart,
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: id => dispatch(getCart(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
