import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import Routes from './routes'
import Header from './components/Header'
import Auth from './pages/Auth'
import { initSocket } from './reducers/socket-io/actionsCreators'

function App({ initSocket }) {
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    const isToken = JSON.parse(localStorage.getItem('@midiasocial@'))
    if (isToken) {
      initSocket()
      setIsAuth(false)
    } else {
      setIsAuth(true)
    }
  }, [])
  return (
    <Router>
      {isAuth === false &&
        <>
          <Header />
          <Routes />
        </>
      }

      {isAuth === true && <Auth setIsAuth={setIsAuth} />}
    </Router>
  );
}

export default connect(null, { initSocket })(App);
