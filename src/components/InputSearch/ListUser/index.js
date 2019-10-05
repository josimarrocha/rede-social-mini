import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import pathImageDefault from '../../../config/util'
import { searchProfile } from '../../../reducers/search/actionsCreators'
import { ResultList } from './styles'

const ListUser = ({ search, link, cleanInput, userSearch, searchProfile, markupUser, inHeader }) => {
  useEffect(() => {
    if (userSearch !== '') {
      searchProfile(userSearch)
    }
  }, [userSearch])
  const Action = link ? Link : 'span'

  return (
    <ResultList className="result-list" inHeader={inHeader}>
      <ul>
        {search.map(item => (
          <Action
            to={`/${item.username}/${item.id}`}
            key={`profile:${item.id}`}>
            <li onClick={() => {
              cleanInput('')
              !link && markupUser({ ...item })
            }}>
              <span>
                <img src={item.image_profile_mini
                  ? item.image_profile_mini :
                  `${pathImageDefault.pathImageDev}/user@50.png`} alt="" />
              </span>
              <b>{item.name}</b>
            </li>
          </Action>
        ))}
      </ul>
    </ResultList>
  )
}

const mapStateToProps = state => ({
  search: state.search
})

export default connect(mapStateToProps, { searchProfile })(ListUser)
