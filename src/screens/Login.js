import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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

const WhiteBox = styled.div`
  padding: 20px 40px;
  margin: 10px 20px;
  background-color: ${(props) => props.theme.boxBg};
  border: 1px solid ${(props) => props.theme.borderColor};
  text-align: center;

  font-size: 12px;
  line-height: 24px;
  color: ${(props) => props.theme.fontColor};
`;

const Title = styled.h1`
  margin: 40px 0;
`;

const LoginForm = styled.form``;

const InputStyle = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  outline: none;
`;

const InputText = styled(InputStyle)`
  margin: 10px 0;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  padding: 12px 8px;
  background-color: ${(props) => props.theme.boxBg};
  color: ${(props) => props.theme.fontColor};

  &:focus {
    border-color: ${(props) => props.theme.borderFocusColor};
  }
`;

const InputButton = styled(InputStyle)`
  cursor: pointer;

  margin: 15px 0;
  border: 0;
  border-radius: 5px;
  padding: 8px;
  background-color: ${(props) => props.theme.accent};

  color: white;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
`;

const FacebookLogin = styled.a`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #385185;

  span {
    margin-left: 6px;
  }
`;

const OrLine = styled.div`
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 20px;
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    z-index: 1;
  }

  span {
    position: relative;
    display: inline-block;
    padding: 8px 16px;
    background-color: ${(props) => props.theme.boxBg};
    z-index: 10;
  }
`;

const SignUpButton = styled(Link)`
  cursor: pointer;

  font-weight: 700;
  color: ${(props) => props.theme.accent};
`;

const Login = () => (
  <Container>
    <Wrapper>
      <WhiteBox>
        <Title>
          <FontAwesomeIcon
            icon={faInstagram}
            size={"5x"}
            color={(props) => props.theme.fontColor}
          />
        </Title>
        <LoginForm action="">
          <InputText
            type="text"
            name=""
            id=""
            placeholder="전화번호, 사용자 이름 또는 이메일"
          />
          <InputText type="password" name="" id="" placeholder="비밀번호" />
          <InputButton type="submit" value="로그인" placeholder="로그인" />
        </LoginForm>
        <OrLine>
          <span>또는</span>
        </OrLine>
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook 으로 로그인</span>
        </FacebookLogin>
      </WhiteBox>
      <WhiteBox>
        <span>계정이 없으신가요?</span>{" "}
        <SignUpButton to="/sign-up">가입하기</SignUpButton>
      </WhiteBox>
    </Wrapper>
  </Container>
);

export default Login;
