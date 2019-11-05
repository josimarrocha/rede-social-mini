import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import gethours from '../../../config/getHours'
import { socket } from '../../../config/api'
import { changeUserActive } from '../../../reducers/chat/posts/actionsCreators'
import imageUserDefault from '../../../assets/images/user@50.png'
import { ConatinerInfo } from './styles'

let timer, timer2
const InfoUser = ({ userActive, setGoback, goBack, changeUserActive, userInfo }) => {
  const [isTyping, setIsTyping] = useState(false)
  const [status, setStatus] = useState({})

  useEffect(() => {
    userActive._id && socket.on('typing', info => {
      if (info.idUser === userActive.uuid && info.idConversation === userActive.idConversation) {
        clearTimeout(timer)
        setIsTyping(true)
        timer = setTimeout(() => {
          setIsTyping(false)
        }, 1000)
      }
    })
    clearInterval(timer2)
    timer2 = setInterval(() => {
      userActive.uuid && socket.emit('verifyStatus', userActive.uuid)
    }, 2000)
    // return () => { socket.close() }
  }, [userActive.uuid])

  useEffect(() => {
    socket.on('status', status => {
      setStatus(status)
    })
  }, [])

  window.onbeforeunload = function () {
    socket.emit('off', userInfo.id)
    return
  }

  const renderStatus = () => {
    return (
      status.status ?
        <>
          <small className='user-status'>
            <b>{isTyping && 'Digitando...'}</b>
          </small>
          <div className="status"></div>
        </>
        :
        <small style={{ fontSize: 11 }}>
          <b>Visto por último {gethours(status.updatedAt)}</b>
        </small>
    )
  }

  return (
    <ConatinerInfo className='header-info'>
      {!goBack ? <div className="header-title">
        <h3>Bate-papo</h3>
      </div>
        :
        <div className="user-conversation">
          <>
            <div className="go-back"
              onClick={() => {
                setGoback(false)
                changeUserActive({})
              }}>
              <i className="fas fa-arrow-left"></i>
            </div>
            <div className="user-img conversation">
              <img src={userActive.imageProfile
                ? userActive.imageProfile
                : imageUserDefault} alt="" />
            </div>
            <div className="user-info conversation">
              {userActive.name &&
                <h4>{userActive.name.length > 18
                  ? userActive.name.substring(0, 18) + '...'
                  : userActive.name}
                </h4>}
              {userActive && <p>{userActive.username}</p>}
              {renderStatus()}
            </div>
          </>
        </div>
      }
    </ConatinerInfo>
  )
}

const mapStateToProps = state => ({
  userActive: state.chat.messages.userActive,
  userInfo: state.userInfo
})

export default connect(mapStateToProps, { changeUserActive })(InfoUser)
