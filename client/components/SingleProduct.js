import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/singleProduct'
import EditProduct from './EditProduct'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  render() {
    const singleProduct = this.props.singleProduct
    return (
      <div>
        <h1>{singleProduct.name}</h1>
        <div className="singleCampus">
          <img
            src={singleProduct.imageUrl}
            alt={singleProduct.name}
            style={{width: '400px'}}
          />
          <p>{singleProduct.price}</p>
          <p>{singleProduct.location}</p>
          <p>{singleProduct.description}</p>
          <p>{singleProduct.disclaimer}</p>
        </div>
        {this.props.isAdmin ? (
          <EditProduct singleproduct={singleProduct} />
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
