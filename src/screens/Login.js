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
  background-color: white;
  border: 1px solid #dbdbdb;
  text-align: center;

  font-size: 13px;
  line-height: 28px;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: 700;
  margin: 50px 0;
`;

const LoginForm = styled.form`
  input {
    box-sizing: border-box;
    display: block;
    width: 100%;

    outline: none;
    margin: 10px 0;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    padding: 8px;

    &[type="submit"] {
      margin: 15px 0;
      border: 0;
      background-color: rgba(0, 149, 246, 0.3);

      color: white;
      font-weight: 700;
      line-height: 18px;
    }

    &:focus {
      border-color: #666666;
    }
  }
`;

const Login = () => (
  <Container>
    <Wrapper>
      <WhiteBox>
        <Title>Instargram</Title>
        <LoginForm action="">
          <input
            type="text"
            name=""
            id=""
            placeholder="전화번호, 사용자 이름 또는 이메일"
          />
          <input type="password" name="" id="" placeholder="비밀번호" />
          <input type="submit" value="로그인" placeholder="로그인" />
        </LoginForm>
        <span>또는</span>
        <div>
          <a href="#">Facebook 으로 로그인</a>
        </div>
      </WhiteBox>
      <WhiteBox>
        <span>계정이 없으신가요?</span>
        <a href="#">가입하기</a>
      </WhiteBox>
    </Wrapper>
  </Container>
);

export default Login;
