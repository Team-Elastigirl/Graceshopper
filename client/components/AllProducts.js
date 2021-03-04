import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  componentDidMount() {
    // console.log(this.props)
    this.props.getProducts()
  }

  render() {
    //const {products} = this.props
    console.log(this.props, 'red')
    let productsArray = this.props.products

    return (
      <div>
        <h1>Constellation Getaways</h1>
        <div className="products">
          {productsArray.length ? (
            productsArray.map(product => (
              <div className="solo-product" key={productsArray.id}>
                <Link to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                  <img
                    src={product.imageUrl}
                    allt={product.name}
                    style={{width: '400px'}}
                  />
                  <p>{product.price}</p>
                  <p>{product.location}</p>
                  <p>{product.description}</p>
                  <p>{product.disclaimer}</p>
                </Link>
              </div>
            ))
          ) : (
            <h3>
              Booked Out! No available Constellation Trips at this time, check
              again soon!
            </h3>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('inside mapState')
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  console.log('inside mapDispatch - purple')
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)