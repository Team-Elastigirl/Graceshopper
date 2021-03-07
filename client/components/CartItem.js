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
      quantity: 0
    }
    this.removeItem = this.removeItem.bind(this)
    this.decrease = this.decrease.bind(this)
    this.increase = this.increase.bind(this)
  }

  decrease() {
    if (this.state.quantity > 0) {
      this.setState({
        quantity: this.state.quantity - 1
      })
    }
  }

  increase() {
    this.setState({
      quantity: this.state.quantity + 1
    })
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.cartItem.quantity
    })
  }

  removeItem(itemId) {
    console.log(`Item #${itemId} REMOVED`)
    this.props.remove(itemId)
  }

  render() {
    const item = this.props.cartItem
    return (
      <div>
        <h3>{item.name}</h3>
        <img src={item.imageUrl} allt={item.name} style={{width: '400px'}} />
        <p>Price: {item.price}</p>
        <p>Location: {item.location}</p>
        <button onClick={this.decrease}>-</button>
        <span>{this.state.quantity}</span>
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
    remove: id => dispatch(removeFromCart(id))
  }
}

export default connect(mapState, mapDispatch)(CartItem)
