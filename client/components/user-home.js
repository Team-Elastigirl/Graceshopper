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
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: true
    // isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
