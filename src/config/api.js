import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('@tokenmidiasocial')
}

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Authorization': `${getToken() ? `bearer ${getToken()}` : ''}`,
  },
})


export default api