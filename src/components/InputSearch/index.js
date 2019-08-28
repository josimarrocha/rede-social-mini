import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { searchProfile } from '../../reducers/search/actionsCreators'
import { FormConatiner } from './styles'

const InputSearch = ({ search, searchProfile, mobile }) => {
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

  return (
    <FormConatiner mobile={mobile}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          autoComplete="off"
          onChange={searchUser}
          value={inputSearch}
          className='form-input' name="search" placeholder='Pesquisar usuário' />
      </form>
      {isEmptyInput && <div className="result-list">
        <ul>
          {search.map(item => (
            <Link to={`${item.username}/${item.id}`} key={`profile:${item.id}`}>
              <li onClick={() => {
                setIsEmptyInput(false)
                setInputSearch('')
              }}>
                <span>
                  <img src={item.image_profile_mini} alt="" />
                </span>
                <b>{item.username}</b>
              </li>
            </Link>
          ))}
        </ul>
      </div>}
    </FormConatiner>
  )
}

const mapStateToProps = state => ({
  search: state.search
})

export default connect(mapStateToProps, { searchProfile })(InputSearch)
