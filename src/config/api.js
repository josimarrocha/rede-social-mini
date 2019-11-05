import axios from 'axios'
import io from 'socket.io-client'

export const urlRedeSocial = 'https://midia-social.herokuapp.com'
// export const urlRedeSocial = 'http://localhost:3333'

export const urlChat = 'https://api-chat-rede-social.herokuapp.com/'
// export const urlChat = 'http://localhost:4444'

export const socket = io(urlChat)

const token = JSON.parse(localStorage.getItem('@midiasocial@'))
const tokenChat = JSON.parse(localStorage.getItem('@chat-midiasocial@'))
const getAPIRedeSocial = () => {
  if (token) {
    return axios.create({
      baseURL: urlRedeSocial,
      headers: {
        'Authorization': `bearer ${token.token}`
      },
    })
  } else {
    return axios.create({
      baseURL: urlRedeSocial
    })
  }
}

export const getAPIChat = () => {
  if (tokenChat) {
    return axios.create({
      baseURL: urlChat,
      headers: {
        'Authorization': `bearer ${tokenChat.token}`,
      },
    })
  } else {
    return axios.create({
      baseURL: urlChat
    })
  }
}

export default getAPIRedeSocial()