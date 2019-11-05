import styled from 'styled-components'

export const ContainerPosts = styled.main`
  background: #eee;
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  overflow-y: auto;
  position: relative;
  /* opacity: 0; */
  transition: opacity 50ms linear;
  flex: 5;
  
  ::-webkit-scrollbar {
    width: 6px;
    background: #F4F4F4;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background:rgba(172, 167, 167, 0.8); 
  }
`