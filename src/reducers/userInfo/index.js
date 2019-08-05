import { LOGIN_USER } from './actionsCreators'

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default userInfo