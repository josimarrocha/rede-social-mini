import styled from 'styled-components'
import styles from '../../styles';
// import styles from '../../styles'

export const ContainerComments = styled.div`
  width: 100%;
  background: #f8f8f8;

  .comment-content{
    padding: 5px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    letter-spacing: 0.3px;

    img.img{
      width: 45px;
      height: 45px;
    }

    .more-comments{
      display: block;
      color: #333;
      text-decoration: underline;
      width: 100%;
      margin-bottom: 5px;
      text-align: center;
      cursor: pointer;
    }
  }
`

export const User = styled.div`
  display: flex;
  margin-bottom: 5px;

  .img-user{
    margin-right: 8px;
  }

  .user-profile{
    .repost-post{
      padding: 3px;
      background: #e4e5ee;
      border-radius: 6px;
      b{
        padding-left:5px;
      }
      .user-comment-post{
        padding: 5px;
      }
    }

    .comments-actions{
      margin-bottom: 8px;
      margin-top: 3px;

      span{
        margin-left: 5px;
        margin-right: 5px;
      }
      b{
        background: #dddfdd;
        border-radius: 6px;
        text-align:center;
        padding: 0 5px;
        color: #666;
        cursor: pointer;

        &.activeLike{
          color: ${styles.colorPrimary};
        }
      }
    }
  }
`