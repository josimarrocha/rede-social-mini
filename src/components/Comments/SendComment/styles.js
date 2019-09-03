import styled from 'styled-components'

export const SendCommentContainer = styled.div`
  width: 100%;
  display: flex;
  
  .img-user-logged{
    flex: 1;
    margin-right:  ${props => props.answer ? '-6px' : '3px'};
    margin-right: 5px;
    img{
      max-width: ${props => props.answer ? '35px' : '100%'};
      max-height: ${props => props.answer ? '35px' : '100%'}
    }
  }
  form{
    flex: 8;
    textarea{
      border-radius: 5px;
      border:none;
      border: 1px solid #ddd;
      width: 100%;
      min-height: 33px;
      resize: vertical;
      padding: 5px;
    }
  }
`