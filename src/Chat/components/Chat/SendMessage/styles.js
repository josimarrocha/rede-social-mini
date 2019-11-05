import styled from 'styled-components'
import styles from '../../../../styles'

export const ContainerSend = styled.div`
  background: #ddd;
  padding: 8px 5px;
  width: 100%;
  display: flex;
  max-height: 100px;
  flex-wrap:wrap;
  align-items: center;
  position: relative;

  .emoji-mart .emoji-mart-bar{
    display: none;
  }
  .message-content{
    div.close-picker{
      width: 100%;
      height: 1000%;
      background: transparent;
      position: absolute;
      top:-900%;
      left:0;
      z-index: 0;
    }
    textarea{
      max-width: 250px;
      resize: none;
      overflow-x: hidden;
      padding-left:5px;
      padding-top:10px;
      border-radius: 15px;
      border: solid 1px #bbb;
      outline:0;
      font-size: 14px;
    }
  }
  .icons i{
    font-size: 28px;
    color: #3bb6e7;
    margin-left: 10px;
    cursor: pointer;
    
  }
  .icons .fa-laugh{
    color: #999;
  }
  .btn-send{
    margin-left: 8px;
    button{
      border-radius: 20px;
      text-decoration:none;
      background: ${styles.colorPrimary};
      cursor: pointer;
      color: #f8f8f8;
      font-size: 16px;
      padding: 10px 15px;
      display: block;
      letter-spacing: 0.8px;
      font-weight: 600;
      border:none;
      outline: none;

      &:active{
        transition: background 200ms ease;
        background: #ccc;
      }
    }
  }
`

export const PreviewImg = styled.figure`
  position: absolute;
  max-width: 100%;
  width: 100%;
  padding: 15px 0;
  left: 0;
  background: #eee;
  bottom: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .header{
    .close{
      position: absolute;
      right: 50px;
      top: 10px;
      font-size: 28px;
      cursor: pointer;
      color: #444;
    }

    .image-name{
      margin-bottom: 20px;
      font-weight: 500;
      text-align:center;
      font-size: 14px;
      word-break: break-all;
      margin-left: -50px;
      width:200px;
    }
  }

  .img-content{
    max-width: 45%;
    max-height: 380px;
    img{
      max-width: 80%;
      max-height: 380px;
      width: 100%;
    }
  }
`