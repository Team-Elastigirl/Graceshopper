import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {postProduct} from '../store/products'

export class AddProduct extends React.Component {
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
    this.props.addProduct({...this.state})

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
        <h3>Add Product</h3>

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

          <button
            type="submit"
            disabled={
              !this.state.name ||
              !this.state.quantity ||
              !this.state.price ||
              !this.state.description ||
              !this.state.location
            }
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

// const mapState = state => {
//   console.log('admin state', state)
//   return {
//     newProduct: state.newProduct
//   }
// }

const mapDispatch = dispatch => {
  return {
    addProduct: newProduct => dispatch(postProduct(newProduct))
  }
}

export default connect(null, mapDispatch)(AddProduct)
