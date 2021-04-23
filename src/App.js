import { useReactiveVar } from "@apollo/client";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import GlobalStyles, { darkTheme, lightTheme } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          {!isLoggedIn && (
            <Route path="/sign-up">
              <SignUp />
            </Route>
          )}
          <Route path="/login">
            <h1>Page Loggedin</h1>
            {!isLoggedIn && "Piz.Login"}
          </Route>
          <Redirect to={"/"} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
