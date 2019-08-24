import Ws from '@adonisjs/websocket-client'

export const INIT_SOCKET = 'socket:INIT_SOCKET'

export const initSocket = () => dispatch => {
  const io = Ws('ws://localhost:3333')
  const { token } = JSON.parse(localStorage.getItem('@midiasocial@'))
  io.withJwtToken(token)
    .connect()
  dispatch({
    type: INIT_SOCKET,
    payload: {
      comment: io.subscribe('comment'),
      answersComment: io.subscribe('AnswersComment'),
      friends: io.subscribe('friends')
    }
  })
}