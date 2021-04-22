import { useReactiveVar } from "@apollo/client";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route path="/login">
            <h1>Page Loggedin</h1>
            {!isLoggedIn && "Piz.Login"}
          </Route>
          <Redirect to={"/"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
