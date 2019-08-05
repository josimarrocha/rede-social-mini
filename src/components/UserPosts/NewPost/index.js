import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Ws from '@adonisjs/websocket-client'
import { NewPostContainer } from './styles'
import { createNewPost } from '../../../reducers/posts/actionsCreators'

const io = Ws('ws://localhost:3333')
let post

const NewPost = ({ createNewPost }) => {
  const [legend, setLegend] = useState()
  const [image, setImage] = useState()
  useEffect(() => {
    // startWebSocket()
  }, [])

  const startWebSocket = () => {
    io.connect()
    post = io.subscribe('post')
    post.on('ready', () => {
    })
    post.on('newPost', (event) => {
      console.log(event)
    })
  }

  const newPost = async (e) => {
    e.preventDefault()
    const event = e.target
    if (!legend && !image) {
      return false
    }
    const data = new FormData()
    data.append('legend', legend)
    data.append('image', image)

    createNewPost(data)
    setImage('')
    setLegend('')
    event.reset()
  }

  const isImageOrlegendEmpty = () => {
    return image || legend ? true : false
  }

  console.log(isImageOrlegendEmpty())

  return (
    <NewPostContainer>
      <form action="" onSubmit={newPost}>
        <div className="newpost-header">
          <div className="newpost-up-img">
            <label htmlFor="input"><i className="fas fa-camera"></i></label>
            <input
              type="file"
              name="inputImage"
              id="input"
              style={{ display: 'none' }}
              onChange={({ target: { files } }) => setImage(files[0])} />
          </div>
          <div className="newpost-up-post">
            <button
              disabled={!isImageOrlegendEmpty() ? true : false}
              className={!isImageOrlegendEmpty() ? 'disabled' : ''}>
              Publicar
            </button>
          </div>
        </div>
        <div className="post-content">
          <textarea
            name="legend"
            cols="30"
            rows="10"
            onChange={({ target: { value } }) => setLegend(value)} />
        </div>
      </form>
    </NewPostContainer>
  )
}

export default connect(null, { createNewPost })(NewPost)
