import React, { useState, useEffect } from 'react'
import Login from '../../components/SignIn'
import SignUp from '../../components/SignUp'
import imageCapa from '../../assets/images/capa-inicio.jpg'
import { Container } from './styles'

const token = JSON.parse(localStorage.getItem('@midiasocial@'))
const Auth = ({ history }) => {
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    if (token) {
      history.push('/')
    }
  }, [])

  return (
    <>
      {!token && <Container>
        <div className="login-content">
          <div className="brand">
            <div className="preview">
              <img src={imageCapa} alt="" />
            </div>
          </div>
          {isLogin
            ? <Login history={history} setIsLogin={setIsLogin} isLogin={isLogin} />
            : <SignUp setIsLogin={setIsLogin} isLogin={isLogin} />
          }
        </div>
      </Container>
      }
    </>
  )
}

export default Auth
