import Ws from '@adonisjs/websocket-client'

export default {
  pathImageProd: '/rede-social-mini/images',
  pathImageDev: '/rede-social-mini/images'
}

export const userToken = JSON.parse(localStorage.getItem('@midiasocial@'))
const io = Ws('wss://midia-social.herokuapp.com')
// const io = Ws('ws://localhost:3333')
if (userToken) {
  io.withJwtToken(userToken.token).connect()
}

export const commentIO = io.subscribe('comment')
export const friendsIO = io.subscribe('friends')