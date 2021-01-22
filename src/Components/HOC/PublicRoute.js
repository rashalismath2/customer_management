
import React from 'react'
import AuthService from '../../Services/auth'
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = AuthService.isAuthenticated()

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
            <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
          
        ) : (
            <Component {...props} />
        )
      }
    />
  )
}

export default PublicRoute