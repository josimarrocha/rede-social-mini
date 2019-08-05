import api from '../../config/api'
export const LOGIN_USER = 'user:LOGIN_USER'


export const loginUser = () => async dispatch => {
  const isToken = localStorage.getItem('@tokenmidiasocial')

  // if (!isToken) {
  const { data: { token, username, image_profile, image_profile_mini, id, email } } =
    await api.post('auth/login', {
      email: 'jo@yahoo.com',
      password: '123456'
    })
  localStorage.setItem('@tokenmidiasocial', token)

  dispatch({
    type: LOGIN_USER,
    payload: {
      id,
      username,
      email,
      image_profile,
      image_profile_mini
    }
  })
  // }
}