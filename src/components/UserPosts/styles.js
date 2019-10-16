import styled from 'styled-components'
import styles from '../../styles'
export const ContainerPosts = styled.section`
  max-width: 500px;
  width: 100%;
  display: inline-block;
  margin-left: 300px;
  margin-right: 10px;
  padding-bottom: 10px;
  border-radius: 4px;
  height: 100%;

  @media (max-width: ${styles.containerMiddle}) {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
  }
`