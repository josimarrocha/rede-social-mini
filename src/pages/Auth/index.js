import React, { useState } from 'react'
import Login from '../../components/SignIn'
import SignUp from '../../components/SignUp'
import { Container } from './styles'

const Auth = ({ setIsAuth }) => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <Container>
      <div className="login-content">
        <div className="brand"></div>
        {isLogin
          ? <Login setIsAuth={setIsAuth} setIsLogin={setIsLogin} isLogin={isLogin} />
          : <SignUp setIsLogin={setIsLogin} isLogin={isLogin} />
        }
      </div>
    </Container>
  )
}

export default Auth
