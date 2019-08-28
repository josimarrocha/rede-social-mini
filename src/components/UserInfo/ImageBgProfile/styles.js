import styled from 'styled-components'
import styles from '../../../styles'

export const ContainerImage = styled.div`
  margin-left: 300px;
  width: calc(100% - 300px);
  margin-bottom: 20px;
  
  .image-bg{
    img{
      width: 100%;
      max-width: 100%;
    }
    @media (max-width: ${styles.containerMiddle}) {
     display: none;
    }
  }
`