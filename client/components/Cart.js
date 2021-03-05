import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromCart} from '../store/cart'

/**
 * COMPONENT
 */
export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.removeItem = this.removeItem.bind(this)
  }

  removeItem(itemId) {
    console.log(`Item #${itemId} REMOVED`)
    this.props.remove(itemId)
  }

  render() {
    const cart = this.props.cart
    console.log('CART', cart)
    return (
      <div>
        <h2>Cart Items</h2>
        <div>
          {cart.addedItems.map(item => {
            return (
              <div key={item.id}>
                <h3>{item.name}</h3>
                <img
                  src={item.imageUrl}
                  allt={item.name}
                  style={{width: '400px'}}
                />
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Location: {item.location}</p>
                <p>{item.description}</p>
                <button onClick={() => this.removeItem(item.id)}>
                  Remove From Cart
                </button>
              </div>
            )
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

const mapDispatch = dispatch => {
  return {
    remove: id => dispatch(removeFromCart(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
