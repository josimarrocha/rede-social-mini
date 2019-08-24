import React, { useState } from 'react'
import InputSearch from '../InputSearch'
import { MenuMobileContainer } from './styles'

const MenuMobile = () => {
  const [isListMenu, setIsListMenu] = useState(false)
  return (
    <MenuMobileContainer>
      <div className="menu-content">
        <span className="icon-menu" onClick={() => setIsListMenu(!isListMenu)}>
          <i className="fas fa-bars"></i>
        </span>
        {isListMenu &&
          <div className="">
            <ul className="menu-list">
              <li><InputSearch /></li>
              <li className='menu-item'>Ver amigos</li>
              <li className='menu-item'>dsidjsixs</li>
            </ul>
          </div>}
      </div>
    </MenuMobileContainer>
  )
}

export default MenuMobile
