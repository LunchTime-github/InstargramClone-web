import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  const isLoggedIn = false;

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? "Home" : "Login"}
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
