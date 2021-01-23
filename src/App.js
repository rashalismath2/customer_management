import {BrowserRouter,Route,Switch} from "react-router-dom"


import './App.css';

import Login from "./Components/Login"
import DashBoard from "./Components/DashBoard"
import Register from "./Components/Register"

import ProtectedRoute from "./Components/HOC/ProtectedRoute"
import PublicRoute from "./Components/HOC/PublicRoute"
import CodeExist from "./Components/HOC/CodeExist"

import EnterEmail from "./Components/ResetPassword/AddEmail"
import EnterCode from "./Components/ResetPassword/EnterCode"
import NewPassword from "./Components/ResetPassword/NewPassword"
// import EnterEmail from "./Components/ResetPassword/En"

function App() {
  return (
    <BrowserRouter>
      <div id="App">
          <Switch>
            <PublicRoute exact path="/" component={Login} />
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/recover-email" component={EnterEmail} />

            <CodeExist exact path="/enter-code" component={EnterCode} />
            <CodeExist exact path="/new-passwords" component={NewPassword} />

            <ProtectedRoute exact path="/dashboard" component={DashBoard} />
            <Route  path="*" component={DashBoard} />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
