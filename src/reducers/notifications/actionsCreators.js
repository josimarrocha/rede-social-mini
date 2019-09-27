import api from '../../config/api'

export const LOADING_NOTIFICATIONS = 'notifications:LOADING_NOTIFICATIONS'

export const loadingNotifications = () => async dispatch => {
  try {
    const { data: { data } } = await api.get('/notification')
    dispatch({
      type: LOADING_NOTIFICATIONS,
      payload: data
    })

  } catch (error) {
  }
}