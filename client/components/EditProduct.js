import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/singleProduct'

export class EditProduct extends React.Component {
  constructor(props) {
    super(props)
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

  componentDidMount() {
    if (this.props.product.id) {
      this.setState({
        name: this.props.product.name,
        quantity: this.props.product.quantity,
        price: this.props.product.price,
        description: this.props.product.description,
        imageUrl: this.props.product.imageUrl,
        location: this.props.product.location,
        disclaimer: this.props.product.disclaimer
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.name,
        quantity: this.props.product.quantity,
        price: this.props.product.price,
        description: this.props.product.description,
        imageUrl: this.props.product.imageUrl,
        location: this.props.product.location,
        disclaimer: this.props.product.disclaimer
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    this.setState({
      name: this.state.name,
      quantity: this.state.quantity,
      price: this.state.price,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
      location: this.state.location,
      disclaimer: this.state.disclaimer
    })

    this.props.editProduct({...this.props.product, ...this.state})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
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
          Update
        </button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editProduct: obj => dispatch(updateProduct(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
