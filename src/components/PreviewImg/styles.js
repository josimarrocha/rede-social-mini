import styled from 'styled-components'
import styles from '../../styles'

export const PreviewContainer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 12;
  overflow-x: hidden;

  .preview-close{
    position: relative;
    right: 220px;
    top: 50px;
    color: white;
    cursor: pointer;
    i{
      font-size: 28px;
    }
  }

  .preview-content{
    position: relative;
    width: 100%;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      margin: 0 auto;
      max-width: 100%;
      max-height: 600px;
    }
  }

  .btn-actions{
    position: relative;
    left: 0; 
    margin-top: 20px;

    button{
      cursor: pointer;
      background: ${styles.colorPrimary};
      border: 0;
      padding: 8px;
      color: ${styles.colorWhite};
      font-weight: 600;
      border-radius:2px;

      &:first-child{
        margin-right: 12px;
      }
    }
    
  }
`