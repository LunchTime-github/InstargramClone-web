import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 45px;
  padding: 0 20px;

  max-width: 930px;
  width: 100%;
`;

const Layout = ({ children }) => (
  <>
    <Header />
    <Content>{children}</Content>
  </>
);

export default Layout;
