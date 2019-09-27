import api from '../../config/api'
import { SHOW_POSTS_TIMELINE } from '../posts/actionsCreators'

export const FRIENDS_PENDING = 'friends:FRIENDS_PENDING'
export const FRIENDS_PENDING_IO = 'friends:FRIENDS_PENDING_IO'
export const SHOW_FRIENDS = 'friends:SHOW_FRIENDS'
export const CONFIRM_FRIEND = 'friends:CONFIRM_FRIEND'
export const LOADING_PROFILE_FRIEND = 'friends:LOADING_PROFILE_FRIEND'

export const friendsPending = (id) => async dispatch => {
  const { data } = await api.get('profile/friendsPending')
  dispatch({
    type: FRIENDS_PENDING,
    payload: { data, id }
  })
}

export const friendsPendingIo = (data, id) => async dispatch => {
  dispatch({
    type: FRIENDS_PENDING_IO,
    payload: {
      data,
      id
    }
  })
}

export const showFriends = (id) => async dispatch => {
  const { data: friends } = await api.get(`profile/friends/${id}`)
  dispatch({
    type: SHOW_FRIENDS,
    payload: friends
  })
}

export const confirmFriend = (friend_id) => async dispatch => {
  const { data: { user_id } } = await api.put('profile/addfriendsPending', { friend_id })
  dispatch({
    type: CONFIRM_FRIEND,
    payload: user_id
  })
}

export const loadingProfile = (id) => async dispatch => {
  dispatch({
    type: SHOW_POSTS_TIMELINE,
    payload: {
      posts: [],
      clean: true
    }
  })
  const { data: profileFriend } = await api.get(`profile/friend/${id}`)
  dispatch({
    type: LOADING_PROFILE_FRIEND,
    payload: profileFriend
  })
}
