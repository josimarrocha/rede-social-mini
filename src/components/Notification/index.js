import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import api from '../../config/api'
import { loadingNotifications } from '../../reducers/notifications/actionsCreators'
import { showLoader } from '../../reducers/ui'
import imageUserDefault from '../../assets/images/user@50.png'
import { Container, NotificationList } from './styles'

const Notification = ({ notifications, loadingNotifications, showLoader, showNotifications }) => {
  const containerRef = useRef()
  useEffect(() => {
    const updateNotifications = async () => {
      await api.put('/notification')
      loadingNotifications()
    }
    updateNotifications()
    containerRef.current.focus()
  }, [loadingNotifications])

  const renderImageNotification = (image_post) => {
    return (
      <>
        <img className='image_notification' src={image_post} alt='' />
      </>
    )
  }
  const formatPostLegend = (legend) => {
    return legend !== '' ? `"${legend.substring(0, 30).replace(/(@\w+\d+)\${\d+}/g, '$1')}"` : ''
  }
  return (
    <Container ref={containerRef} tabIndex={0} /*onBlur={() => setTimeout(() => showNotifications(false), 200)}*/>
      <div className="notification-header">
        <p>Notificações</p>
      </div>
      <NotificationList>
        {notifications.map(notification => (
          <Link to={notification.href}
            key={`notifications:${notification.id_notification}`}
            onClick={() => showLoader(true)}>
            <li className='notification-item'>
              <div className="img-profile">
                <img src={notification.image_user_action
                  ? notification.image_user_action
                  : imageUserDefault} alt="" />
              </div>
              <div className="notification-info">
                <p>
                  <b>{notification.name_user_action}</b> {notification.action}:
                  {notification.action_id === 1 && `"${notification.comment || notification.reply}"`}
                  {notification.action_id === 2 && formatPostLegend(notification.legend_post)}
                  {notification.action_id === 3 && formatPostLegend(notification.legend_post)}
                  {notification.action_id === 6 && formatPostLegend(notification.legend_post)}
                  {notification.action_id === 4 && `"${notification.comment}"`}
                  {notification.action_id === 5 && renderImageNotification(notification.image_post)}
                </p>
                <small>12 minutos atrás</small>
              </div>
            </li>
          </Link>
        ))}
      </NotificationList>

    </Container>
  )
}

const mapStateToProps = state => ({
  notifications: state.notifications,
})

export default connect(mapStateToProps, { loadingNotifications, showLoader })(Notification)
