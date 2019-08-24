import { SHOW_FRIENDS, FRIENDS_PENDING, FRIENDS_PENDING_IO, CONFIRM_FRIEND, LOADING_PROFILE_FRIEND } from './actionsCreators'

const initialState = {
  friends: [],
  friendsPending: [],
  friendProfile: {}
}

const friends = (state = initialState, action) => {

  switch (action.type) {
    case SHOW_FRIENDS:
      return {
        ...state,
        friends: action.payload
      }
    case FRIENDS_PENDING:
      return {
        ...state,
        friendsPending: action.payload.data
      }
    case FRIENDS_PENDING_IO:
      return {
        ...state,
        friendsPending: state.friendsPending.concat(action.payload.data)
      }
    case CONFIRM_FRIEND:
      return {
        ...state,
        friendsPending: state.friendsPending.filter(friendP => friendP.friend_id !== action.payload)
      }
    case LOADING_PROFILE_FRIEND:
      return {
        ...state,
        friendProfile: { ...action.payload[0] },
        friends: action.payload[0].friends
      }
    default:
      return state
  }
}

export default friends
