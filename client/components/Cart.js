import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromCart, getCart} from '../store/cart'

/**
 * COMPONENT
 */
export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.removeItem = this.removeItem.bind(this)
    this.generateCart = this.generateCart.bind(this)
  }

  async componentDidMount() {
    const userId = this.props.user ? this.props.user.id : null
    console.log('props on the cart', this.props)
    await this.props.getCart(userId)
  }

  removeItem(itemId) {
    console.log(`Item #${itemId} REMOVED`)
    this.props.remove(itemId)
  }
  // combines booking and product obj
  generateCart() {
    return this.props.cart.map(item => {
      const product = this.props.products.find(
        elem => item.productId === elem.id
      )
      return {...product, ...item}
    })
  }

  render() {
    const cart = this.props.cart
    const productsInCart = this.generateCart()
    console.log('CART76', productsInCart)
    return (
      <div>
        <h2>Cart Items</h2>
        <div>
          {cart.length
            ? cart.map(item => {
                return (
                  <div key={`cartItem-${item.id}`}>
                    <h3>{item.name}</h3>
                    <img
                      src={item.imageUrl}
                      allt={item.name}
                      style={{width: '400px'}}
                    />
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Subtotal: {item.unitPrice}</p>
                    <p>Location: {item.location}</p>
                    <p>{item.description}</p>
                    <button onClick={() => this.removeItem(item.id)}>
                      Remove From Cart
                    </button>
                  </div>
                )
              })
            : null}
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
    cart: state.cart,
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    remove: id => dispatch(removeFromCart(id)),
    getCart: id => dispatch(getCart(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
