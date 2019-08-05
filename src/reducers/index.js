import { combineReducers } from 'redux'
import initialDataProfile from './posts'
import userInfo from './userInfo'

export default combineReducers({
  initialDataProfile,
  userInfo
})