import React from 'react'
import { ClipLoader } from 'react-spinners'
import styled from 'styled-components'

const Loader = ({ isLoading }) => {
  return (
    <ContainerLoader>
      <ClipLoader loading={isLoading} size={50} color='#E38073' />
    </ContainerLoader>
  )
}

const ContainerLoader = styled.div`
  position: absolute;
  width: 100%;
  background-color: #f8f8f8;
  display: flex;
  height: 100vh;
  /* top: 0; */
  align-items: center;
  justify-content: center;
  z-index: 5;
  overflow: hidden ;
`

export default Loader
