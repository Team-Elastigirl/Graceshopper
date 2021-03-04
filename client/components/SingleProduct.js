import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/singleProduct'

export class SingleProduct extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {}
  // }

  render() {
    //const singleProduct = this.props.singleProduct

    return (
      <div>
        <h1>{n}</h1>
        {/* <div className="products">
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
      </div> */}
      </div>
    )
  }
}

const mapState = state => {
  console.log('my mapState', state)
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  console.log('inside mapDispatch - pink')
  return {
    getSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
