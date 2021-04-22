import { isLoggedInVar } from "../apollo";

const Login = () => (
  <>
    <h1>Login</h1>
    <button onClick={() => isLoggedInVar(true)}>Log in Now!</button>
  </>
);

export default Login;
