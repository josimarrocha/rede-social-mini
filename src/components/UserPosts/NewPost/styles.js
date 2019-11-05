import styled from 'styled-components'
import styles from '../../../styles'

export const NewPostContainer = styled.div`
  background: ${styles.colorWhite};
  padding-bottom: 10px;
  box-shadow: 1px 1px 15px #ccc;
  margin-bottom: 20px;
  border-radius: 10px;
  position: relative;

  .newpost-header{
    display: flex;
    height: 35px;
    justify-content: space-between;
    border-bottom: 1px solid ${styles.colorBorder};
    padding: 0 20px;
    align-items: center;

    .newpost-up-post button{
      outline: none;
      background: ${styles.colorPrimary};
      border: none;
      padding: 3px 8px 3px 8px;
      font-size: ${styles.fontSmall};
      font-weight: bold;
      color: #f8f8f8;
      cursor: pointer;
      letter-spacing: 0.5px;
    }
    .newpost-up-post button.disabled{
      background: ${styles.colorPrimaryDisabled};
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .result-list{
    left:0;
    top:0;
    position: relative;
  }
  .user-markup{
      font-weight: bold;
      text-decoration: underline;
    }
  .post-content{
    position: relative;
    height: 100px;
    overflow-x: inherit;
    max-height:100px;
    overflow-y: scroll;
    padding: 8px;
    font-size: ${styles.fontSmall};
    outline:0;
    font-weight: normal;

    textarea{
      width: 100%;
      border: none;
      border-bottom: 1px solid ${styles.colorBorder};
      outline: none;
      padding: 10px;
      resize: none;
    }
  }
`