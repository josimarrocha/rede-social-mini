import io from 'socket.io-client'
import api, { getAPIChat, urlChat } from '../../config/api'
export const LOGIN_USER = 'user:LOGIN_USER'
export const UPDATE_IMAGE_USER = 'user:UPDATE_IMAGE_USER'
export const UPDATE_BACKGROUND_IMAGE_USER = 'user:UPDATE_BACKGROUND_IMAGE_USER'
export const UPDATE_NAME_USER = 'user:UPDATE_NAME_USER'
export const LOADING_PROFILE = 'user:LOADING_PROFILE'
export const UPDATE_DESCRIPTION_USER = 'user:UPDATE_DESCRIPTION_USER'

export const loginUser = ({ token, username, image_profile, image_profile_mini, id, email, tokenChat }) => async dispatch => {
  localStorage.setItem('@midiasocial@', JSON.stringify({
    token,
    id,
    email,
    username
  }))
  localStorage.setItem('@chat-midiasocial@', JSON.stringify({ token: tokenChat }))
  dispatch({
    type: LOGIN_USER,
    payload: {
      id,
      username,
      email,
      image_profile,
      image_profile_mini,
      token
    }
  })
}

export const updateImageUser = (image) => async dispatch => {
  const { data: { newImage } } = await api.put(`profile/updateImage`, image)
  await getAPIChat().put('users/imageProfile', { pathImage: newImage })
  dispatch({
    type: UPDATE_IMAGE_USER,
    payload: newImage
  })
}

export const updateImageBackground = (image) => async dispatch => {
  const { data: { newImageBackground } } = await api.put(`profile/updateImageBackground`, image)
  dispatch({
    type: UPDATE_BACKGROUND_IMAGE_USER,
    payload: newImageBackground
  })
}

export const updateNameUser = (nameUser) => async dispatch => {
  const { data: { name } } = await api.put(`profile/updateName`, { nameUser })
  dispatch({
    type: UPDATE_NAME_USER,
    payload: name
  })
}

export const updateDescription = (userDescription) => async dispatch => {
  const { data: { description } } = await api.put('profile/updateDescription', { description: userDescription })

  dispatch({
    type: UPDATE_DESCRIPTION_USER,
    payload: description
  })

}

let timer
const socket = io(urlChat)
export const loadingProfile = (id) => async dispatch => {
  const sendStatus = () => {
    clearTimeout(timer)
    socket.emit('online', id)
    timer = setTimeout(() => {
      sendStatus()
    }, 2000)
  }
  sendStatus()
  const { data: profileFriend } = await api.get(`userProfile/${id}`)
  dispatch({
    type: LOADING_PROFILE,
    payload: profileFriend[0]
  })
}