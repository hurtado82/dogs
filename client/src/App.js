import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header"
import LandingPage from './components/LandingPage';
import Home from "./components/Home"
import DogDetail from "./components/DogDetail"

function App() {
  return (
    <div className="App">
      <Header />
      <LandingPage />
      <Route exact path="/dogs" component={Home}  />
      <Route exact path="/dogs/:id" component={DogDetail}  />
    </div>
  );
}

export default App;
