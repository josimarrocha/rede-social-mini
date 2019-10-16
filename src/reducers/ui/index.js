const SHOW_SEARCH = 'ui:SHOW_SEARCH'
const SHOW_USER_CONFIG = 'ui:SHOW_USER_CONFIG'
const SHOW_NOTIFICATIONS = 'ui:SHOW_NOTIFICATIONS'
const SHOW_FRIENDS_PENDING = 'ui:SHOW_FRIENDS_PENDING'
const SHOW_LOADER = 'ui:SHOW_LOADER'
const HIDE_ALL = 'ui:HIDE_ALL'


const initialState = {
  showSearch: false,
  showUserConfig: false,
  showNotifications: false,
  showFriendsPending: false,
  showLoader: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SEARCH:
      return {
        ...state,
        showSearch: false
      }
    case SHOW_USER_CONFIG:
      return {
        ...state,
        showUserConfig: action.payload,

      }
    case SHOW_NOTIFICATIONS:
      return {
        ...state,
        showNotifications: action.payload,

      }
    case SHOW_FRIENDS_PENDING:
      return {
        ...state,
        showFriendsPending: action.payload,

      }
    case SHOW_LOADER:
      return {
        ...state,
        showLoader: action.payload
      }
    case HIDE_ALL:
      return {
        // showUserConfig: false,
        // showSearch: false,
        // showNotifications: false,
        // showFriendsPending: false
      }
    default:
      return state
  }
}

export const hide = () => dispatch => {
  dispatch({
    type: HIDE_ALL
  })
}
export const showUserConfig = (boolean) => dispatch => {
  dispatch({
    type: SHOW_USER_CONFIG,
    payload: boolean
  })
}
export const showNotifications = (boolean) => dispatch => {
  dispatch({
    type: SHOW_NOTIFICATIONS,
    payload: boolean
  })
}
export const showFriendsPending = (boolean) => dispatch => {
  dispatch({
    type: SHOW_FRIENDS_PENDING,
    payload: boolean
  })
}
export const showLoader = (boolean) => dispatch => {
  dispatch({
    type: SHOW_LOADER,
    payload: boolean
  })
}