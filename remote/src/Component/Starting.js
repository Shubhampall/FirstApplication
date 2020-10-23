import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'

function Starting() {
    return (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Regisration" component={Registration} />
        </Switch>
    )
}

export default Starting
