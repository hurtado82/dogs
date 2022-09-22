import './App.css';
import Home from "./components/Home"
import { Route } from 'react-router-dom';
import DogDetail from "./components/DogDetail"
import LandingPage from './components/LandingPage';
import Create from './components/Create';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/dogs" component={Home} />
      <Route exact path="/dogs/:id" component={DogDetail} />
      <Route exact path="/create" component={Create} />
    </div>
  );
}

export default App;
