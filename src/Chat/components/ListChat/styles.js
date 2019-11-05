import styled from 'styled-components'
import styles from '../../../styles'

export const ContainerList = styled.section`
  width: 100%;
  height: 480px;
  background: #ffffef;
  z-index: 50;
  overflow-y: auto;

  @media (max-width: ${styles.containerSmall + 'px'}) and (max-height: 800px) {
    height: 90vh;
  }

  @media (max-height: 700px) and (min-width: ${styles.containerSmall + 'px'}) {
    height: 400px;
  }
  
  .content{
    z-index: 5;
    position: relative;
    background: #ffffef;

    .add-user{
      text-align: center;
      margin-top: 50px;
      color: #555;
      font-style: italic;
      padding: 0 20px;
      background: #eee;
    }
  }
`