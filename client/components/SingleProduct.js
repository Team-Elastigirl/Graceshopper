import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/singleProduct'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  render() {
    //console.log('render',this.props.singleProduct)
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
  console.log('my mapDispatch - pink')
  return {
    getSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
