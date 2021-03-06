import styled from 'styled-components'
import styles from '../../../styles'

export const UserComment = styled.div`
  display: flex;
  margin-bottom: 5px;
  position: relative;

  .img-user{
    flex: 1;

    img{
      width: 40px;
      max-width: ${props => props.answer ? '35px' : '100%'};
      max-height: ${props => props.answer ? '35px' : '100%'}
    }
  }

  .user-profile{
    flex: 9;
    .repost-post{
      padding: 3px;
      background: #e4e5ee;
      border-radius: 6px;

      &.comment-active{
        animation: commentMarkup 3s linear 0.5s ;
        transition: animation 200ms;
      }
      
      b{
        padding-left:5px;
      }
      .user-comment-post{
        padding: 5px;
      }

      .options-comment{
        position: absolute;
        right: 10px;
        cursor: pointer;
        top: 15px;
      }
      .options{
        position: absolute;
        font-size: 14px;
        background: #f8f8f8;
        border-radius: 5px;
        top: 16px;
        left: -65px;
        border: 1px solid #ddd;
        padding: 5px 8px;
        cursor:pointer;

        &:hover{
          background: #f0f0f0
        }
      }
    }

    .comments-actions{
      margin-bottom: 8px;
      margin-top: 3px;
      color: #666;

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
      .reply{
        font-weight: 600;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
`