import axios from 'axios'

const getToken = () => {
  const token = JSON.parse(localStorage.getItem('@midiasocial@'))
  if (token) {
    return axios.create({
      baseURL: 'http://localhost:3333',
      headers: {
        'Authorization': `${`bearer ${token.token}`}`,
      },
    })
  } else {
    return axios.create({
      baseURL: 'http://localhost:3333'
    })
  }
}

export default getToken()