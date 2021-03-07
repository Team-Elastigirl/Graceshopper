import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addToCart, fetchProducts, deleteProduct} from '../store/products'
import AddProduct from './AddProduct'

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    // console.log(this.props)
    this.props.getProducts()
  }

  handleClick(id) {
    this.props.addToCart(id)
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
                  <h3>{product.name}</h3>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{width: '400px'}}
                  />
                </Link>
                <p>{product.price}</p>
                <p>{product.location}</p>
                <button
                  type="button"
                  className="add-to-cart"
                  onClick={() => {
                    this.handleClick(product.id)
                  }}
                >
                  Add to Cart
                </button>
                <p>{product.description}</p>
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
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addToCart: id => dispatch(addToCart(id)),
    deleteProduct: id => dispatch(deleteProduct(id))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
