import styled from 'styled-components'
import styles from '../../../styles'

export const SendCommentContainer = styled.div`
  width: 100%;
  display: flex;
  font-size: 13px;
  
  .img-user-logged{
    flex: 1;
    img{
      width: 40px;
      max-width: ${props => props.answer ? '35px' : '100%'};
      max-height: ${props => props.answer ? '35px' : '100%'}
    }
  }
  form{
    flex: 9;
    display: flex;
    textarea{
      overflow-x: hidden;
      border-radius: 5px;
      border:none;
      border: 1px solid #ddd;
      width: 100%;
      min-height: 33px;
      resize: vertical;
      padding: 5px;
      @media (max-width: ${styles.containerMiddle}) {
       margin: 0 5px;
      }
    }

    span{
      display:none;
      align-self: center;
      font-size: ${styles.fontSmall};
      @media (max-width: ${styles.containerMiddle}) {
        display: block;
      }
      button{
        height: 30px;
      }
    }
  }
`