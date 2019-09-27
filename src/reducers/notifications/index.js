import { LOADING_NOTIFICATIONS } from './actionsCreators'

const initialState = []

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_NOTIFICATIONS:
      return action.payload
    default:
      return state
  }
}

export default notifications