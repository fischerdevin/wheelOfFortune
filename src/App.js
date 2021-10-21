import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import LandingPage from "./Components/LandingPage/LandingPage";
import "./CSSReset.css";
import "./App.css";
import "./Layout.css";
import "./Components/GameBoard/GameBoard.css";
import "./Components/Dashboard/Dashboard.css";
import "./Components/Keyboard/Keyboard.css";
import "./Components/SpinWheel/SpinWheel.css";
import "./Components/Setting/Setting.css";
import "./Components/Solve/Solve.css";

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
