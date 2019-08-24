import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../reducers/userInfo/actionsCreators'
import FormLogin from '../Form'
import { Container } from './styles'
import api from '../../config/api'

const SignIn = ({ setIsAuth, setIsLogin, isLogin, loginUser }) => {
  const [error, setError] = useState('')

  const login = async (e) => {
    e.preventDefault()
    const { email, password } = e.target
    if (email.value !== '' && password.value !== '') {
      try {
        const { data } = await api.post('auth/login', {
          email: email.value,
          password: password.value
        })
        await loginUser(data)
        setIsAuth(false)
        window.location.reload()
      } catch (error) {
        setError('Email ou senha incorretos!')
      }
    }
  }
  return (
    <Container>
      <FormLogin
        submit={login}
        error={error}
        setIsLogin={setIsLogin}
        isLogin={isLogin}
      />
    </Container>
  )
}

export default connect(null, { loginUser })(SignIn)
