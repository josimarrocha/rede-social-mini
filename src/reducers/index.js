import { combineReducers } from 'redux'
import initialDataProfile from './posts'
import userInfo from './userInfo'
import friendsInfo from './friends'
import search from './search'
import comments from './comments'
import socket from './socket-io'

export default combineReducers({
  initialDataProfile,
  userInfo,
  friendsInfo,
  search,
  comments,
  socket
})