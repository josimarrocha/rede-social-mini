import Ws from '@adonisjs/websocket-client'

export const userToken = JSON.parse(localStorage.getItem('@midiasocial@'))
const io = Ws('wss://midia-social.herokuapp.com')
// const io = Ws('ws://localhost:3333')
if (userToken) {
  io.withJwtToken(userToken.token).connect()
}

export const commentIO = io.subscribe('comment')
export const friendsIO = io.subscribe('friends')