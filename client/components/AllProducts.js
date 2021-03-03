import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  render() {
    return (
      <div>
        <h1>All Products</h1>
        <div className="single-product">
          {/* <Link to={`/products/${product.id}`}> */}
          <h3>Product Name Goes Here</h3>
          <h3>Product Name Goes Here</h3>
          <h3>Product Name Goes Here</h3>
          <h3>Product Name Goes Here</h3>
          <h3>Product Name Goes Here</h3>
          <h3>Product Name Goes Here</h3>
        </div>
      </div>
    )
  }
}
