import React, { useState } from 'react'
import ListUser from './ListUser'
import { FormConatiner } from './styles'

const InputSearch = ({ inHeader }) => {
  const [inputSearch, setInputSearch] = useState('')
  return (
    <FormConatiner inHeader={inHeader}>
      {inHeader &&
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            autoComplete="off"
            onChange={({ target: { value } }) => setInputSearch(value)}
            value={inputSearch}
            className='form-input' name="search" placeholder='Pesquisar usuário' />
          {inputSearch &&
            <ListUser
              inHeader={true}
              link={true}
              cleanInput={setInputSearch}
              userSearch={inputSearch} />
          }
        </form>
      }
    </FormConatiner >
  )
}

export default InputSearch
