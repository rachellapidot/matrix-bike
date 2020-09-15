import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/home/index"
import "./App.css"
import BikeDetais from './components/bikeDetails/index';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
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
      <div className="wrapper">
        <Router>
          <Switch>
            
             <Route path="/bikes/:id">
              <BikeDetais />
            </Route>
            
            <Route path="/bikes">
              <Home />
            </Route>
            <Route path="/"><Redirect to="/bikes" /></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
