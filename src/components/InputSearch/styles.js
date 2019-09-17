import styled from 'styled-components'
import styles from '../../styles'

export const FormConatiner = styled.div`
  position: relative;
  form {
    position: relative;
    margin-left: 15rem;
    flex: 2;

    @media (max-width: ${styles.containerMiddle}) {
      margin-left: 10rem;
    }

    @media (max-width: ${styles.containerSmall + 'px'}) {
      margin-left: 0rem
    }
    
    .form-input{
      border: none;
      border-radius: 4px;
      height: 25px;
      outline: none;
      padding-left: 5px;
      width: 20rem;
      font-size: ${styles.fontSmall}; 
      @media (max-width: ${styles.containerSmall + 'px'}) {
        width: 20rem;
        height: 35px;
        border-bottom: 1px solid #aaa;

      }
    }
  }

  .result-list{
    background: ${styles.colorWhite};
    right: 0;
    top: 26px;
    position: absolute;
    width: 20rem;
    box-shadow: 0px 1px 5px #666;  
    ul{
      width: 100%;
    }

    li{
      display: flex;
      color: #333;
      padding: 3px 5px 3px 5px;
      border-bottom: 1px solid #ddd;
      cursor: pointer;

      &:hover{
        background: #ddd;
      }

      span{
        width: 35px;
        margin-right: 10px;
        img{
          max-width: 100%;
        }
      }

      b{
        font-size: ${styles.fontSmall}
      }
    }
  }
`