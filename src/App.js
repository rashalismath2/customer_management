import {BrowserRouter,Route} from "react-router-dom"


import './App.css';

import Login from "./Components/Login"
import DashBoard from "./Components/DashBoard"

function App() {
  return (
    <BrowserRouter>
      <div id="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={DashBoard} />
      </div>
    </BrowserRouter>
  );
}

export default App;
