import { combineReducers } from 'redux'
import posts from './posts'
import userInfo from './userInfo'
import friendsInfo from './friends'
import search from './search'
import comments from './comments'
import socket from './socket-io'
import notifications from './notifications'
import ui from './ui'

export default combineReducers({
  posts,
  userInfo,
  friendsInfo,
  search,
  comments,
  socket,
  notifications,
  ui
})