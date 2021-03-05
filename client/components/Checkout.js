import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      payment: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    this.setState({
      name: '',
      address: '',
      payment: '',
      email: ''
    })

    console.log('Checkout Info Submitteed')
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {name, address, payment, email} = this.state
    const disable =
      !name.trim() || !address.trim() || !payment.trim() || !email.trim()

    return (
      <div>
        <h2>Checkout</h2>
        <form onSubmit={this.handleSubmit}>
          <p>Shipping Information</p>
          <label htmlFor="name">Full Name:</label>
          <input name="name" onChange={this.handleChange} value={name} />

          <label htmlFor="address">Address:</label>
          <input name="address" onChange={this.handleChange} value={address} />

          <p>Payment Information</p>
          <label htmlFor="payment">Card Number:</label>
          <input name="payment" onChange={this.handleChange} value={payment} />

          <p>Contact Information</p>
          <label htmlFor="email">Email:</label>
          <input name="email" onChange={this.handleChange} value={email} />

          <button type="submit" disabled={disable}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Checkout)
