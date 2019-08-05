import React from 'react'
import { HeaderContainer } from './styles'

const Header = () => {
  return (
    <HeaderContainer>
      <div className="header-content">
        <div className="header-logo">
          <h2>Midia</h2>
        </div>
        <form action="">
          <input type="text" className='form-input' name="search" />
        </form>
      </div>
    </HeaderContainer>
  )
}

export default Header
