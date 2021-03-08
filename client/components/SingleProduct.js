import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/singleProduct'
import EditProduct from './EditProduct'
import {addToCart} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    console.log('in didMount')
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  handleClick(id, quantity, unitPrice, userId) {
    //console.log(this.props.add)
    console.log('in clickhandle')
    this.props.add(id, {quantity, unitPrice, userId})
  }

  render() {
    const singleProduct = this.props.singleProduct
    //not getting props
    console.log(singleProduct, 'single product')
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
          <button
            type="button"
            className="add-to-cart"
            onClick={() => {
              this.handleClick(
                singleProduct.id,
                singleProduct.quantity,
                singleProduct.price,
                this.props.user.id
              )
            }}
          >
            Add to Cart
          </button>
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
  console.log('in mapState')
  return {
    singleProduct: state.singleProduct,
    isAdmin: state.user.isAdmin,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  console.log('in dispatch')
  return {
    getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    add: (id, obj) => dispatch(addToCart(id, obj))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
