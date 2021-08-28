import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          {/* <Route path="/" exact>
            <Home />
          </Route> */}
          <Route path="" exact component={Auth}></Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
