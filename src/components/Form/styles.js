import styled from 'styled-components'
import styles from '../../styles'

export const FormContainer = styled.div`

  .form-content{
    display: flex;
    align-items:center;
    height: 100%;
    flex-direction: column;
    width: 100%;

    .title{
      margin-top: 50px;
      h2{
        font-size: 2rem;
      }
    }

    form{
      margin-top: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .action{
        margin-top: 20px;
        font-style: italic;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .message-error{
      color:red;
      font-size: 14px;
      transform:translateY(10px)
    }

    .message-success{
      font-size: 1.2rem;
      color: rgb(62, 202, 62);
    }

    .input-group{
      margin-top: 20px;
      max-width: 400px;
      width: 100%;
      input{
        padding: 10px;
        width: 100%;
      }
    }

    .btn-action{
      margin-top: 30px;
      width: 100%;
      text-align:center;

      .btn-auth{
        max-width: 400px;
        width: 100%;
        padding: 10px 0;
        background: ${styles.colorPrimary};
        border: none;
        color: white;
        font-weight: bold;
        font-size: 18px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        cursor: pointer;
      }
    }
  }
`