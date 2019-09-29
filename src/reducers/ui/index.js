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
        showUserConfig: !state.showUserConfig,
        showSearch: false,
        showNotifications: false,
        showFriendsPending: false
      }
    case SHOW_NOTIFICATIONS:
      return {
        ...state,
        showNotifications: !state.showNotifications,
        showFriendsPending: false,
        showSearch: false,
        showUserConfig: false,
      }
    case SHOW_FRIENDS_PENDING:
      return {
        ...state,
        showFriendsPending: !state.showFriendsPending,
        showSearch: false,
        showUserConfig: false,
        showNotifications: false,
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
export const showUserConfig = () => dispatch => {
  dispatch({
    type: SHOW_USER_CONFIG
  })
}
export const showNotifications = () => dispatch => {
  dispatch({
    type: SHOW_NOTIFICATIONS
  })
}
export const showFriendsPending = () => dispatch => {
  dispatch({
    type: SHOW_FRIENDS_PENDING
  })
}
export const showLoader = (boolean) => dispatch => {
  dispatch({
    type: SHOW_LOADER,
    payload: boolean
  })
}