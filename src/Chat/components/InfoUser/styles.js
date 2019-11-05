import styled from 'styled-components'
import styles from '../../../styles'

export const ConatinerInfo = styled.header`
  width:100%;
  background: ${styles.colorPrimary};
  height: 60px;
  border-bottom: 1px solid #bbb;
  display: flex;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  justify-content: space-between;

  .header-title{
    text-align: center;
    display:flex;
    align-items: center;
    justify-content: center;
    color: #f8f8f8;
    width:100%;
  }
 .user-conversation{
    display: flex;
    align-items:center;
    color: #f2f2f2;
    position: relative;
    flex: 2;

    .go-back{
      margin:0 10px 0 5px;
      width: 30px;
      height: 30px;
      font-size: 18px;
      border-radius: 50%;
      text-align: center;
      padding-top: 5px;
      cursor: pointer;
      transition: background 200ms linear;
      &:hover{
        background: rgba(0, 0, 0, 0.4 );   
      }
    }
  }
  .user-img{
    width: 60px;
    img{
      background: white;
      ::selection{
        background: transparent;
      }
      border-radius: 50%;
      max-width:100%;
    }
  }
  .user-img.conversation{
    width: 40px;
    float:right;
  }
  .user-info.conversation{
    margin-left: 10px;
    text-shadow: 1px 1px 5px #999;
    p{
      font-size: 12px;
    }
    .user-status{
      position: relative;
      letter-spacing: 0.6px;
      font-size: 13px;
      font-style: italic;
      font-weight: 300;
    }

    .status{
      position:absolute;
      width: 20px;
      height: 20px;
      background: rgb(163, 250, 76);
      border-radius: 50%;
      right: 15px;
      top: 20px;
    }
  }
`

export const PreviewImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left:0;
  z-index: 15;

  .close-preview{
    color:white;
    right: 250px;
  }
  .image-content{
    display: flex;
    justify-content: center;
    width: 100%;
    figure{
      margin-top: 50px;
      img{
        display: block;
        width:100%;
        max-width:400px;
      }
    }
  }
`

export const Actions = styled.div`
    margin: 0 auto;
    align-items: center;
    display: flex;
    max-width: 350px;
    padding-top: 20px;

    .btn{
      height: 40px;
      text-transform: uppercase;
      font-weight: 600; 
      width: 100%;
      border: 1px solid #aaa;
      outline: none;
      cursor: pointer;

      &:first-child{
        margin-right: 10px;
        background: rgba(89, 125, 204, 0.8);
        color: #f8f8f8;
        &:hover{
          background: rgba(89, 125, 204, 0.6);
        }
      }
    }
`