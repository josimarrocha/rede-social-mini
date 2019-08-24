import React from 'react'
import { FormContainer } from './styles'

const Form = ({ submit, error, signUp, setIsLogin, isLogin, success }) => {
  return (
    <FormContainer>
      <div className="form-content">
        <div className="title">
          <h2>{signUp ? 'Cadastro' : 'Login'}</h2>
        </div>
        <form action="" onSubmit={submit}>
          <p className='message-error'>{error}</p>
          <p className='message-success'>{success}</p>
          {signUp && <div className="input-group">
            <input type="text" name="name" id="" placeholder='Digite seu nome' />
          </div>}
          <div className="input-group">
            <input type="email" name="email" id="" placeholder='Digite seu e-mail' />
          </div>
          <div className="input-group">
            <input type="password" name="password" id="" placeholder='Digite sua senha' />
          </div>
          {signUp && <div className="input-group">
            <input type="password" name="confirmpassword" id="" placeholder='Confirme sua senha' />
          </div>}
          <div className='btn-action'>
            <button className='btn-auth'>{signUp ? 'Cadastrar' : 'Entrar'}</button>
          </div>
          <p className='action'
            onClick={() => setIsLogin(!isLogin)}>
            {signUp ? 'Voltar para tela de login' : 'Ou cadastre-se'}
          </p>
        </form>
      </div>
    </FormContainer>
  )
}

export default Form
