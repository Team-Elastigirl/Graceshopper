import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllUsers from './AllUsers'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      {isAdmin ? <AllUsers /> : ''}
      <div className="profile-product">
        <h3>Profile</h3>
        <p>Your profile will be displayed here!</p>
      </div>
      <div className="profile-product">
        <h3>Order History</h3>
        <p>You have no orders at this time. Book your first trip now!</p>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
