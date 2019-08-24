import styled from 'styled-components'
import styles from '../../../styles'

export const UserComment = styled.div`
  display: flex;
  margin-bottom: 5px;

  .img-user{
    margin-right:  ${props => props.answer ? '10px' : '8px'};

    img{
      max-width: ${props => props.answer ? '35px' : '100%'};
      max-height: ${props => props.answer ? '35px' : '100%'}
    }
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