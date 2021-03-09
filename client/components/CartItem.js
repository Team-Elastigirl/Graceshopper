import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromCart} from '../store/cart'

/**
 * COMPONENT
 */
export class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0
    }
    this.removeItem = this.removeItem.bind(this)
    this.decrease = this.decrease.bind(this)
    this.increase = this.increase.bind(this)
  }

  decrease() {
    if (this.state.amount > 0) {
      this.setState({
        amount: this.state.amount - 1
      })
    }
  }

  increase() {
    if (this.state.amount < this.props.cartItem.quantity) {
      // console.log('this in cartitem', this.props.cartItem)
      this.setState({
        amount: this.state.amount + 1
      })
    }
  }

  componentDidMount() {
    this.setState({
      amount: this.props.cartItem.amount
    })
  }

  removeItem(itemId) {
    console.log(`Item #${itemId} REMOVED`)
    const orderId = this.props.orderId || 0
    console.log('remove orderId', orderId)
    this.props.remove(itemId, orderId)
  }

  render() {
    const item = this.props.cartItem
    console.log('THIS.STATE', this.state)
    console.log('THIS.PROPS', this.props)
    return (
      <div>
        <h3>{item.name}</h3>
        <img src={item.imageUrl} allt={item.name} style={{width: '400px'}} />
        <p>Price: ${item.price * this.state.amount}</p>
        <p>Location: {item.location}</p>
        <button onClick={this.decrease}>-</button>
        <span>{this.state.amount}</span>
        <button onClick={this.increase}>+</button>
        <button onClick={() => this.removeItem(item.id)}>
          Remove From Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    remove: (productId, orderId) => dispatch(removeFromCart(productId, orderId))
  }
}

export default connect(mapState, mapDispatch)(CartItem)
