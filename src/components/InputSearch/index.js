import React, { useState, useRef, useEffect } from 'react'
import ListUser from './ListUser'
import { FormConatiner } from './styles'

const InputSearch = ({ inHeader, hideIcons, setHideIcons }) => {
  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    hideIcons && inputRef.current.focus()
  }, [hideIcons])
  const inputRef = useRef()
  return (
    <FormConatiner inHeader={inHeader} hideIcons={hideIcons}>
      {inHeader &&
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            onChange={({ target: { value } }) => setInputSearch(value)}
            value={inputSearch}
            className='form-input' name="search" placeholder='Pesquisar usuário'
            onBlur={() => {
              setHideIcons(false)
            }}
          />
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
