import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers} from '../store/users'

/**
 * COMPONENT
 */
export class AllUsers extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    console.log('users', this.props.users)
    return (
      <div>
        <h1>All Users</h1>
        {this.props.users.map(user => (
          <div key={user.id}>
            <h4>{user.username}</h4>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
