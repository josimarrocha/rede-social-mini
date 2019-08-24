import { SEARCH_PROFILE } from './actionsCreators'

const searchProfile = (state = [], action) => {
  switch (action.type) {
    case SEARCH_PROFILE:
      return action.payload
    default:
      return state
  }
}

export default searchProfile