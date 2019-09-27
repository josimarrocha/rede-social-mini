import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PreviewImg from '../../PreviewImg'
import InputSearch from '../../InputSearch'
import { createNewPost } from '../../../reducers/posts/actionsCreators'
import { searchProfile } from '../../../reducers/search/actionsCreators'
import { NewPostContainer } from './styles'

const NewPost = ({ createNewPost, searchProfile }) => {
  const [legend, setLegend] = useState()
  const [image, setImage] = useState()
  const [isModalPreview, setIsModalPreviw] = useState(false)
  const [userMarkup, setUserMakup] = useState('')

  const textarea = React.createRef()
  useEffect(() => {
    if (!image) {
      setIsModalPreviw(false)
    } else {
      setIsModalPreviw(true)
    }
  }, [image])

  const newPost = async (e) => {
    e.preventDefault()
    const event = e.target
    if (!legend && !image) {
      return false
    }
    const data = new FormData()
    data.append('legend', legend ? legend : '')
    data.append('image', image)

    createNewPost(data)
    setImage('')
    setLegend('')
    event.reset()
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

  const markupUser = (e) => {
    setUserMakup(userMarkup + e.key)

    if (e.charCode === 32 || e.charCode === 13 || textarea.current.value === '') {
      setUserMakup('')
      return false
    }
    if (userMarkup !== '') {
      searchProfile(userMarkup)
      return
    }
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
              ref={textarea}
              name="legend"
              cols="30"
              rows="10"
              onKeyPress={markupUser}
              onChange={({ target: { value } }) => {
                setLegend(value)
              }} />
          </div>
          <InputSearch userMarkup={userMarkup} setUserMakup={setUserMakup} />
        </form>
      </NewPostContainer>
    </>
  )
}

const mapStateToProps = state => ({
  search: state.search
})

export default connect(mapStateToProps, { createNewPost, searchProfile })(NewPost)
