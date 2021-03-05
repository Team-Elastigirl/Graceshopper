import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import AllProducts from './AllProducts'
import {fetchCreatedProduct} from '../store/admin'

export class Admin extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      quantity: '',
      price: '',
      description: '',
      imageUrl: '',
      location: '',
      disclaimer: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.newProduct(this.state)

    this.setState({
      name: '',
      quantity: '',
      price: '',
      description: '',
      imageUrl: '',
      location: '',
      disclaimer: ''
    })
  }

  render() {
    return (
      <div className="createProductForm">
        <p>FireFly</p>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name"> Product Name: </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label htmlFor="quantity"> Quantity: </label>
          <input
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />

          <label htmlFor="price"> Price: </label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />

          <label htmlFor="description"> Description: </label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <label htmlFor="imageUrl"> ImageUrl: </label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />

          <label htmlFor="location"> Location: </label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />

          <label htmlFor="disclaimer"> Disclaimer: </label>
          <input
            type="text"
            name="disclaimer"
            value={this.state.disclaimer}
            onChange={this.handleChange}
          />

          <input
            type="submit"
            value="submit"
            disabled={
              !this.state.name ||
              !this.state.quantity ||
              !this.state.price ||
              !this.state.description ||
              !this.state.imageUrl ||
              !this.state.location ||
              !this.state.disclaimer
            }
          />
        </form>
      </div>
    )
  }
}

const mapState = state => {
  console.log('admin state', state)
  return {
    newProduct: state.newProduct
  }
}

const mapDispatch = dispatch => {
  console.log('admin mapDispatch')
  return {
    newProduct: newProduct => dispatch(fetchCreatedProduct(newProduct))
  }
}

export default connect(mapState, mapDispatch)(Admin)
