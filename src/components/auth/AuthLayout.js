import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 360px;
`;

const AuthLayout = ({ children }) => (
  <Container>
    <Wrapper>{children}</Wrapper>
  </Container>
);

export default AuthLayout;
