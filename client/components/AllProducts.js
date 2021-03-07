import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, deleteProduct} from '../store/products'
import AddProduct from './AddProduct'
import {addToCart} from '../store/cart'


/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    console.log('in the products', this.props)
    this.props.getProducts()
  }

  handleClick(id, quantity, unitPrice, userId) {
    console.log(this.props.add)
    this.props.add(id, {quantity, unitPrice, userId})
  }

  render() {
    let productsArray = this.props.products
    return (
      <div>
        <h1>Constellation Getaways</h1>
        <div className="products">
          {productsArray.length ? (
            productsArray.map(product => (
              <div className="solo-product" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{width: '400px'}}
                  />
                  <h3>{product.name}</h3>
                </Link>
                <p>Price: ${product.price}</p>
                <p>Location: {product.location}</p>
                <button
                  type="button"
                  className="add-to-cart"
                  onClick={() => {
                    this.handleClick(
                      product.id,
                      product.quantity,
                      product.price,
                      this.props.user.id
                    )
                  }}
                >
                  Add to Cart
                </button>
                <p>Description: {product.description}</p>
                <p>{product.disclaimer}</p>
                {this.props.isAdmin ? (
                  <button onClick={() => this.props.deleteProduct(product.id)}>
                    Delete Product
                  </button>
                ) : (
                  ''
                )}
              </div>
            ))
          ) : (
            <h3>
              Booked Out! No available Constellation Trips at this time, check
              again soon!
            </h3>
          )}
          {this.props.isAdmin ? <AddProduct /> : ''}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    isAdmin: state.user.isAdmin,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    deleteProduct: id => dispatch(deleteProduct(id)),
    add: (id, obj) => dispatch(addToCart(id, obj))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
