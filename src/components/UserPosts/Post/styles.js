import styled from 'styled-components'
import styles from '../../../styles'

export const ContainerPost = styled.article`
  width: 100%;
  background: #fff;
  margin-top:20px;
  box-shadow: 1px 1px 15px #ddd;

  .content{
    padding: 10px;
  }

  .header-post{
    border-bottom:1px solid ${styles.colorBorder};
    padding-bottom:5px;
  }
  .post-user{
    display: flex;
    font-size: ${styles.fontSmall};
    img{
      max-width: 100%;
      width: 50px;
    }
    .post-user-info{
      margin-top:8px;
      margin-left: 10px;
      label{
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
    
    .post-user-legend{
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    .post-user-image{
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