import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import pathImageDefault from '../../config/util'
import { searchProfile } from '../../reducers/search/actionsCreators'
import { FormConatiner } from './styles'

const InputSearch = ({ search, searchProfile, inHeader, userMarkup }) => {
  const [isEmptyInput, setIsEmptyInput] = useState(false)
  const [inputSearch, setInputSearch] = useState('')

  const searchUser = (e) => {
    setInputSearch(e.target.value)
    if (e.target.value) {
      const user = JSON.parse(localStorage.getItem('@midiasocial@'))
      searchProfile(e.target.value, user.token)
      setIsEmptyInput(true)
      return true
    }
    setIsEmptyInput(false)
  }

  const renderListUsers = () => {
    return search.map(item => (
      <Action to={`/${item.username}/${item.id}`} key={`profile:${item.id}`}>
        <li onClick={() => {
          setIsEmptyInput(false)
          setInputSearch('')
        }}>
          <span>
            <img src={item.image_profile_mini
              ? item.image_profile_mini :
              `${pathImageDefault.pathImageDev}/user@50.png`} alt="" />
          </span>
          <b>{item.username}</b>
        </li>
      </Action>
    ))
  }

  const Action = inHeader ? Link : 'span'

  return (
    <FormConatiner inHeader={inHeader}>
      {inHeader && <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          autoComplete="off"
          onChange={searchUser}
          value={inputSearch}
          className='form-input' name="search" placeholder='Pesquisar usuário' />
      </form>}
      <div className="result-list">
        <ul>
          {inHeader && isEmptyInput ? renderListUsers() : !inHeader && userMarkup ? renderListUsers() : ''}
        </ul>
      </div>
    </FormConatiner>
  )
}

const mapStateToProps = state => ({
  search: state.search
})

export default connect(mapStateToProps, { searchProfile })(InputSearch)
