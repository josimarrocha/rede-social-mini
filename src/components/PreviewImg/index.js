import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { PreviewContainer } from './styles'

const PreviewImg = ({ abortImagePreview, imagePreview, confirmImagePreview, inPosts }) => {
  return (
    <CSSTransition
      in={!!imagePreview}
      timeout={300}
      classNames='preview'
      unmountOnExit
    >
      <PreviewContainer inPosts={inPosts} onClick={abortImagePreview}>
        <div className="preview-close" onClick={abortImagePreview}>
          <i className="far fa-times-circle"></i>
        </div>
        <div className="preview-content">
          <div className="">
            {imagePreview &&
              <img src={inPosts ? imagePreview : imagePreview && window.URL.createObjectURL(imagePreview)} alt="" />
            }
          </div>
          {!inPosts && <div className="btn-actions">
            <button onClick={confirmImagePreview}>Confirmar</button>
            <button onClick={abortImagePreview}>Cancelar</button>
          </div>}

        </div>
      </PreviewContainer>
    </CSSTransition>
  )
}

export default PreviewImg
