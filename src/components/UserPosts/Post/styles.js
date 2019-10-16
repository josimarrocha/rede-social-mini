import styled from 'styled-components'
import styles from '../../../styles'

export const ContainerPost = styled.article`
  width: 100%;
  background: ${styles.colorWhite};
  box-shadow: 1px 1px 15px #ccc;
  margin-bottom: 10px;
  border-radius: 10px;
  div.send{
    padding: 0 8px 5px 8px;
  }
  .content{
    padding: 10px;
  }

  .header-post{
    border-bottom:1px solid ${styles.colorBorder};
    padding-bottom:5px;
    position: relative;
    .options-post{
      position: absolute;
      right: 10px;
      & > i{
        cursor: pointer;
      }
    }
    .viewed{
      position: absolute;
      right: 40px;
      vertical-align: middle;
      font-size: ${styles.fontSmall};
      span{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        margin-right: 5px;
      }
      &:after{
        content: 'Visualizações';
        opacity: 0;
        position: absolute;
        margin-right: 5px;
        font-size: 13px;
        background-color: rgba(0, 0, 0, 0.8);
        padding: 3px 4px;
        transition: opacity 400ms linear;
        color: #f8f8f8;
        border-radius: 4px;
        top:16px;
        left: -35px;
      }
      &:hover:after{
        opacity: 1;
      }
    }
    .options{
      position: absolute;
      font-size: ${styles.fontSmall};
      background: #f8f8f8;
      border-radius: 5px;
      left: -60px;
      top: 25px;
      border: 1px solid #ddd;
      padding: 5px 8px;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
      cursor:pointer;

      &:hover{
        background: #f0f0f0
      }
    }
  }
  .post-user{
    display: flex;
    font-size: ${styles.fontSmall};
    
    img{
      max-width: 100%;
      width: 50px;
      max-height: 60px;
    }
    .post-user-info{
      margin-top:8px;
      margin-left: 10px;
      a{
        color: #444;
        &:hover{
          text-decoration: underline;
        }
      }
      label{
        cursor: pointer;
        display: block;
        font-weight: 550;
      }
      .post-user-hour{
        font-size: 12px;
        color: #999;
        font-weight: normal;
        margin-top: 5px;
      }
    }
  }

  .post-user-content{
    margin-top:10px;
    font-size: ${styles.fontSmall};
    position: relative;

    .result-list{
      position: absolute;
      left:30px;
      width: 70%;
    }
    .post-user-legend{
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      word-wrap: break-word;
      .user-markup{
        font-weight: bold;
        cursor: pointer;
        color: inherit;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .post-user-image{
      cursor: pointer;
      width: 100%;
      img{
        width: 100%;
        max-width: 100%;
      }
    }
  }

  .btn-actions{
    display: flex;
    width: 100%;
    text-align: center;
    border-top: 1px solid ${styles.colorBorder};

    .btn{
      flex: 1;
      padding:10px;
      cursor: pointer;
      font-weight: 600;
      font-size: ${styles.fontSmall};
      color: #666;
    }
    .btn.like{
      background: ${styles.colorPrimary};
      color: ${styles.colorWhite}
    }
    .btn.like:hover{
      background: ${styles.colorPrimary};
      color: ${styles.colorWhite}
    }
    .btn:hover{
      background: #ddd;
    }
    .btn:first-child{
      border-right: 1px solid ${styles.colorBorder};
    }
  }
`