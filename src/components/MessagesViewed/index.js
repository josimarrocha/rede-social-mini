import React from 'react'

const MessagesViewed = ({ setLinePositionInScreen }) => {
  return (
    <>
      <div onLoadStart={(e) => {
        let posi = e.target.getBoundingClientRect()
        setLinePositionInScreen(posi.top)
        console.log(posi, '')
      }}
        className='area'
        style={{ width: '100%', height: '50px', position: 'fixed', background: 'transparent', bottom: '20%', zIndex: -1 }}>

      </div>
    </>
  )
}

export default MessagesViewed
