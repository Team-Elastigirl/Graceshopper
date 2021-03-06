import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a>
            <img src="rocket.png" alt="rocketlogo" style={{width: '50px'}} />
          </a>
          <a>
            <h1>Star Hopper</h1>
          </a>
          <a>
            <Link to="/home">Home</Link>
          </a>
          <a>
            <Link to="/products">Products</Link>
          </a>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <a>
            <img src="rocket.png" alt="rocketlogo" style={{width: '50px'}} />
          </a>
          <a>
            <h1>Star Hopper</h1>
          </a>
          <a>
            <Link to="/products">Products</Link>
          </a>
          <a>
            {' '}
            <Link to="/login">Login</Link>
          </a>
          <a>
            {' '}
            <Link to="/signup">Sign Up</Link>
          </a>
        </div>
      )}
      <div>
        <a>
          <Link to="/cart">Cart</Link>
        </a>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
