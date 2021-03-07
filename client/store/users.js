import axios from 'axios'

//ACTION TYPE
const SET_USERS = 'SET_USERS'

//ACTION CREATORS
export const setUsers = users => ({
  type: SET_USERS,
  users
})

//THUNK CREATORS
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data: users} = await axios.get('/api/users')
      dispatch(setUsers(users))
    } catch (err) {
      console.log('Error fetching users from API.', err)
    }
  }
}

//INITIAL STATE
const initialState = []

//REDUCER
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}

export default usersReducer
