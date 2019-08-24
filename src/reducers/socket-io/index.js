import { INIT_SOCKET } from './actionsCreators'

const socket = (state = {}, action) => {
  switch (action.type) {
    case INIT_SOCKET:
      return {
        ...action.payload
      }

    default:
      return state
  }
}

export default socket