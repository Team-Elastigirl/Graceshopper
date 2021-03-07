import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartItem from './CartItem'
/**
 * COMPONENT
 */
export class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const cart = this.props.cart
    console.log('CART', cart)
    return (
      <div>
        <h2>Cart Items</h2>
        <div>
          {cart.addedItems.map(item => {
            return <CartItem key={item.id} cartItem={item} />
          })}
        </div>
        <h3>Subtotal: {cart.subtotal}</h3>
        <Link to="/checkout">
          <button>CHECKOUT</button>
        </Link>
      </div>
    )
  }
}
const mapState = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapState)(Cart)
