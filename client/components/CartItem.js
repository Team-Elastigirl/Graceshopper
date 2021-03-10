import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromCart, updateAmount} from '../store/cart'

/**
 * COMPONENT
 */
export class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 1
    }
    this.removeItem = this.removeItem.bind(this)
    this.decrease = this.decrease.bind(this)
    this.increase = this.increase.bind(this)
  }

  decrease(productId) {
    if (this.state.amount === 1) this.removeItem(productId)
    else if (this.state.amount > 0) {
      const decremented = this.state.amount - 1
      this.setState({
        amount: decremented
      })
      this.props.update(productId, decremented, this.props.orderId)
    }
  }

  increase(productId) {
    if (this.state.amount < this.props.cartItem.quantity) {
      const incremented = this.state.amount + 1
      this.setState({
        amount: incremented
      })

      this.props.update(productId, incremented, this.props.orderId)
    }
  }

  componentDidMount() {
    this.setState({
      amount: this.props.cartItem.amount
    })
  }

  removeItem(itemId) {
    const orderId = this.props.orderId || 0
    this.props.remove(itemId, orderId)
  }

  render() {
    const item = this.props.cartItem

    return (
      <div>
        <h3>{item.name}</h3>
        <img src={item.imageUrl} allt={item.name} style={{width: '400px'}} />
        <p>Price: ${item.price * this.state.amount}</p>
        <p>Location: {item.location}</p>
        <button onClick={() => this.decrease(item.id)}>-</button>
        <span>{this.state.amount}</span>
        <button onClick={() => this.increase(item.id)}>+</button>
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
    remove: (productId, orderId) =>
      dispatch(removeFromCart(productId, orderId)),
    update: (productId, amount, orderId) =>
      dispatch(updateAmount(productId, amount, orderId))
  }
}

export default connect(mapState, mapDispatch)(CartItem)
