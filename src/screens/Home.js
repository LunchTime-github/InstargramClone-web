import { logUserOut } from "../apollo";

const Home = () => (
  <div>
    <h1>Home</h1>
    <button onClick={logUserOut}>로그아웃</button>
  </div>
);

export default Home;
