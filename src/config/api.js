import axios from 'axios'

const token = JSON.parse(localStorage.getItem('@midiasocial@'))
const getToken = () => {
  if (token) {
    return axios.create({
      baseURL: 'http://localhost:3333',
      // baseURL: 'https://midia-social.herokuapp.com',
      headers: {
        'Authorization': `${`bearer ${token.token}`}`,
      },
    })
    //https://midia-social.herokuapp.com
  } else {
    return axios.create({
      baseURL: 'http://localhost:3333'
      // baseURL: 'https://midia-social.herokuapp.com'
    })
  }
}

export default getToken()