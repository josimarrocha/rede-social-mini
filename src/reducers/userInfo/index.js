import { LOGIN_USER, UPDATE_IMAGE_USER, UPDATE_NAME_USER, LOADING_PROFILE, UPDATE_DESCRIPTION_USER } from './actionsCreators'

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload
      }
    case LOADING_PROFILE: {
      return {
        ...action.payload
      }
    }
    case UPDATE_IMAGE_USER:
      return {
        ...state,
        image_profile: action.payload
      }
    case UPDATE_NAME_USER:
      return {
        ...state,
        name: action.payload
      }
    case UPDATE_DESCRIPTION_USER:
      return {
        ...state,
        description: action.payload
      }
    default:
      return state
  }
}

export default userInfo