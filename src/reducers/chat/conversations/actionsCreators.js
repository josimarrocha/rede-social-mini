import { getAPIChat, socket } from '../../../config/api'

export const LOADING_CONVERSATIONS = 'conversations:LOADING_CONVERSATIONS'
export const UPDATE_MESSAGES_NOT_READ = 'conversations:UPDATE_MESSAGES_NOT_READ'
export const STATUS = 'convertation:USER_STATUS'

export const loadingConversations = () => async  dispatch => {
  const { data } = await getAPIChat().get('/conversations')

  dispatch({
    type: LOADING_CONVERSATIONS,
    payload: data
  })
}

export const updateStatus = (cleanStatus) => dispatch => {
  if (cleanStatus) {
    dispatch({
      type: STATUS,
      payload: {}
    })
  } else {
    socket.on('status', status => {
      dispatch({
        type: STATUS,
        payload: status
      })
    })
  }
}

