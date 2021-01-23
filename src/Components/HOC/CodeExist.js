
import React from 'react'
import store from "../../Store/store"
import { Redirect, Route } from 'react-router-dom'


const CodeExist = ({ component: Component, ...rest }) => {

    var exists=false
    const state=store.getState()
    if(state.code!=null){
        exists=true
    }
    else{
        exists=false
    }

  return (
    <Route
      {...rest}
      render={props =>
        exists ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/recover-email', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default CodeExist