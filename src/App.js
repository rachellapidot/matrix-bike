import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/home/index"
import "./App.css"
function App() {
  return (
    <div className="App">
      <div className="header">
        <img alt="police-logo" className="police-logo" src={require("./images/berlin_police.png")} />
        <div className='police-title'>
          <span className="first-sub-title">Police Department Of Berlin</span>
          <span className="second-sub-title">Stolen Bykes</span>
        </div>
      </div>
      <Router>
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
