import styled from 'styled-components'
import styles from '../../styles'

export const FormConatiner = styled.div`
  position: relative;
  width: 100%;
  max-width: 50%;
  display: block;

  @media (max-width: ${styles.containerSmallSmall + 'px'}) {
      display: ${props => props.hideIcons ? 'block' : 'none'} !important;
    }

  form {
    margin-left: 9rem;
    position: relative;
    width: 55%;

    @media (max-width: ${styles.containerMiddle}) {
      margin-left: 5rem;
      width: 80%;
    }

    @media (max-width: ${styles.containerSmall + 'px'}) {
      margin-left:2rem
    }
    @media (max-width: ${styles.containerSmallSmall + 'px'}) {
      margin-left:0rem;
      width: 100%;
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