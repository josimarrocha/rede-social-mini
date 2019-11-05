import { combineReducers } from 'redux'
import posts from './posts'
import userInfo from './userInfo'
import friendsInfo from './friends'
import search from './search'
import comments from './comments'
import notifications from './notifications'
import ui from './ui'
import conversations from './chat/conversations'
import messages from './chat/posts'

const chat = combineReducers({
  conversations,
  messages
})
export default combineReducers({
  posts,
  userInfo,
  friendsInfo,
  search,
  comments,
  notifications,
  ui,
  chat
})