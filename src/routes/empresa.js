import React from 'react'
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import Restaurante from '../pages/Restaurante/index'

import loginempresa from '../pages/LoginRestaurante/index'
import { isAuthenticated } from "../authempresa";



const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/loginrestaurante", state: { from: props.location } }} />
        )
      }
    />
  );




const Routes = () =>(
    <BrowserRouter>
     <Switch>
    
        <Route  path="/loginrestaurante" component={loginempresa} />
        <PrivateRoute  path="/restaurante" component={Restaurante} />
        
    </Switch>
    </BrowserRouter>
   
);
export default Routes