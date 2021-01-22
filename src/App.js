import {BrowserRouter,Route,Switch} from "react-router-dom"


import './App.css';

import Login from "./Components/Login"
import DashBoard from "./Components/DashBoard"
import Register from "./Components/Register"

import ProtectedRoute from "./Components/HOC/ProtectedRoute"
import PublicRoute from "./Components/HOC/PublicRoute"

function App() {
  return (
    <BrowserRouter>
      <div id="App">
          <Switch>
            <PublicRoute exact path="/" component={Login} />
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Register} />
            <ProtectedRoute exact path="/dashboard" component={DashBoard} />
            <Route  path="*" component={DashBoard} />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
