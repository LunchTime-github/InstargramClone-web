import { logUserOut } from "../apollo";

const Home = () => (
  <>
    <h1>Home</h1>
    <button onClick={logUserOut}>로그아웃</button>
  </>
);

export default Home;
