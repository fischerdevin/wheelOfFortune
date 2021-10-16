import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import LandingPage from "./Components/LandingPage/LandingPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/wheeloffortune" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
