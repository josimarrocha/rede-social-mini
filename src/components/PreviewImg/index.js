import React from 'react'
import { PreviewContainer } from './styles'

const PreviewImg = ({ abortImagePreview, imagePreview, confirmImagePreview }) => {
  return (
    <PreviewContainer>
      <div className="preview-close" onClick={abortImagePreview}>
        <i className="far fa-times-circle"></i>
      </div>
      <div className="preview-content">
        <div className="">
          <img src={window.URL.createObjectURL(imagePreview)} alt="" />
        </div>
        <div className="btn-actions">
          <button onClick={confirmImagePreview}>Confirmar</button>
          <button onClick={abortImagePreview}>Cancelar</button>
        </div>

      </div>
    </PreviewContainer>
  )
}

export default PreviewImg
