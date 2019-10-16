import styled from 'styled-components'
import styles from '../../styles'

export const PreviewContainer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  overflow-x: hidden;
  padding: 0px 30px;
  .preview-close{
    position: absolute;
    right: 45px;
    top: 20px;
    color: white;
    cursor: pointer;
    z-index: 15;
    i{
      font-size: 28px;
    }
  }

  .preview-content{
    position: relative;
    width: 100%;
    height: 100vh;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;

    img{
      margin: 0px auto;
      max-width: 100%;
  ${props => !props.inPosts
    ? `max-height: 600px;`
    : 'max-height: 94vh;'
  }
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