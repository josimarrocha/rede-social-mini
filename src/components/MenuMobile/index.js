import React, { useState } from 'react'
import { MenuMobileContainer } from './styles'

const MenuMobile = () => {
  const [isListMenu, setIsListMenu] = useState(false)
  const logout = () => {
    localStorage.removeItem('@midiasocial@')
    window.location.reload()
  }
  return (
    <MenuMobileContainer>
      <div className="menu-content">
        <span className="icon-menu" onClick={() => setIsListMenu(!isListMenu)}>
          <i className="fas fa-bars"></i>
        </span>
        {isListMenu &&
          <div className="">
            <ul className="menu-list">
              <li className='menu-item'>Ver amigos</li>
              <li className='menu-item' onClick={logout}>Sair</li>
            </ul>
          </div>
        }
      </div>
    </MenuMobileContainer>
  )
}

export default MenuMobile
