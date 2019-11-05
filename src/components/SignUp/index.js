import React, { useState } from 'react'
import FormSignUp from '../Form'
import { Container } from './styles'
import api from '../../config/api'

const SignUp = ({ setIsLogin, isLogin }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const signUp = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmpassword } = e.target
    if (name.value && email.value && password.value && confirmpassword.value) {
      if (password.value === confirmpassword.value) {
        try {
          const { data } = await api.post('auth/register', {
            name: name.value,
            email: email.value,
            password: password.value
          })
          setSuccess('Cadastro realizado com sucesso!')
        } catch (error) {
          return setError('Usuário já cadastrado!')
        }
        setTimeout(() => {
          setIsLogin(true)
        }, 1200)
        return true
      }
      return setError('Senhas não correspondem!')
    }
    return setError('Todos os campos são obrigatórios!')

  }

  return (
    <Container>
      <FormSignUp
        submit={signUp}
        error={error}
        success={success}
        signUp={true}
        setIsLogin={setIsLogin}
        isLogin={isLogin}
      />
    </Container>
  )
}

export default SignUp
