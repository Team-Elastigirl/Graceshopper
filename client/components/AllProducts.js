import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  // constructor(props) {
  //     super(props);
  // }

  componentDidMount() {
    console.log(this.props)
    this.props.getProducts()
  }

  render() {
    const {products} = this.props
    console.log(this.props, 'red')
    // let productsArray = this.props.products
    // console.log(this.props, productsArray);

    return (
      <div>
        <h1>Constellation Getaways</h1>
        <div className="single-product">
          {/* <Link to={`/products/${product.id}`}> */}
          <h3 />
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
