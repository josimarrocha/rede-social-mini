import styled from 'styled-components'
import styles from '../../styles'

export const FormConatiner = styled.div`
  position: relative;
  width: 100%;
  max-width: 50%;
  form {
    margin-left: 15rem;
    position: relative;
    width: 100%;

    @media (max-width: ${styles.containerMiddle}) {
      margin-left: 5rem;
    }

    @media (max-width: ${styles.containerSmall + 'px'}) {
      margin-left:2rem
    }
    
    .form-input{
      border: none;
      border-radius: 4px;
      height: 25px;
      outline: none;
      padding-left: 5px;
      /* max-width:100%; */
      width: 100%;
      font-size: ${styles.fontSmall}; 
    }
  }

   .result-list{
      position: absolute;
      right:  0;
    }
`