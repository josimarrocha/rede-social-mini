import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PreviewImg from '../../PreviewImg'
import ListUsers from '../../InputSearch/ListUser'
import { createNewPost } from '../../../reducers/posts/actionsCreators'
import { searchProfile } from '../../../reducers/search/actionsCreators'
import { NewPostContainer } from './styles'

let usersMarkup = {}
const NewPost = ({ createNewPost, searchProfile }) => {
  const [legend, setLegend] = useState()
  const [image, setImage] = useState()
  const [isModalPreview, setIsModalPreviw] = useState(false)
  const [searchUser, setSearchUser] = useState('')

  const textarea = React.createRef()

  const newPost = async (e) => {
    e.preventDefault()
    let users = usersNotification()
    let legenda = textarea.current.textContent
    const event = e.target
    if (legenda === '' && !image) {
      return false
    }

    const data = new FormData()
    data.append('legend', legenda ? legenda : '')
    data.append('image', image)
    createNewPost(data, users)
    setImage('')
    setLegend('')
    textarea.current.textContent = ''
    event.reset()
  }

  const usersNotification = () => {
    let users = []
    for (let user in usersMarkup) {
      let regex = new RegExp(`${usersMarkup[user].username}`, 'gi')
      if (regex.test(textarea.current.textContent))
        textarea.current.textContent = textarea
          .current.textContent
          .replace(`${usersMarkup[user].username}`, `${usersMarkup[user].username}$${'{' + usersMarkup[user].id + '}'}`)
      users.push({
        ...usersMarkup[user]
      })
    }
    return users
  }

  const isImageOrlegendEmpty = () => {
    return image || legend ? true : false
  }

  const abortImagePreview = () => {
    setIsModalPreviw(false)
    setImage('')
  }

  const confirmImagePreview = () => {
    setIsModalPreviw(false)
    textarea.current.focus()
  }

  const handleLegendPost = (e) => {
    setLegend(textarea.current.textContent)
    if (e.keyCode !== 8) setSearchUser(searchUser + e.key)
    if (e.keyCode === 8) {
      if (!textarea.current.value) {
        setSearchUser('')
      }
      if (searchUser !== '' && searchUser.length > 2) searchProfile(searchUser)
    }
    if (e.keyCode === 32 || e.keyCode === 13 || textarea.current.textContent === '') {
      if (textarea.current.textContent === '') {
        usersMarkup = {}
      }
      setSearchUser('')
    }
    if (searchUser !== '' && searchUser.length > 2) {
      searchProfile(searchUser)
      return
    }
  }

  const markupUser = (user) => {
    let pattern = `\\s?(${searchUser}\\b)\\s?`
    const regex = new RegExp(pattern, 'i')
    usersMarkup = {
      ...usersMarkup,
      [user.id]: { ...user }
    }
    if (usersMarkup[user.id]) {
      textarea.current.innerHTML = textarea.current.innerHTML.replace(regex, ` <span contentEditable='false' class='user-markup'>${user.username}</span> `)
    }
    setSearchUser('')
  }

  return (
    <>
      {isModalPreview &&
        <PreviewImg
          confirmImagePreview={confirmImagePreview}
          abortImagePreview={abortImagePreview}
          imagePreview={image}
        />
      }
      <NewPostContainer>
        <form action="" onSubmit={newPost}>
          <div className="newpost-header">
            <div className="newpost-up-img">
              <label htmlFor="input"><i className="fas fa-camera"></i></label>
              <input
                type="file"
                name="inputImage"
                id="input"
                hidden
                onChange={({ target: { files } }) => {
                  setImage(files[0])
                  setIsModalPreviw(true)
                }} />
            </div>
            <div className="newpost-up-post">
              <button
                disabled={!isImageOrlegendEmpty() ? true : false}
                className={!isImageOrlegendEmpty() ? 'disabled' : ''}>
                Publicar
              </button>
            </div>
          </div>
          <div
            className="post-content"
            ref={textarea}
            contentEditable='true'
            onKeyUp={handleLegendPost}
          />
          {searchUser.length > 2 &&
            <ListUsers
              userSearch={searchUser}
              markupUser={markupUser}
              cleanInput={setSearchUser} />}
        </form>
      </NewPostContainer>
    </>
  )
}

export default connect(null, { createNewPost, searchProfile })(NewPost)
