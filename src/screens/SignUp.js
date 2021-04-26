import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import {
  InputButton,
  InputSubmitButton,
  InputText,
} from "../components/auth/Inputs";
import WhiteBox from "../components/shared/WhiteBox";
import AuthOrLine from "../components/auth/AuthOrLine";
import AuthTitle from "../components/auth/AuthTitle";
import AuthBottomBox from "../components/auth/AuthBottomBox";
import routes from "../routes";
import PageTitle from "../components/shared/PageTitle";

const AuthSubTitle = styled.h6`
  font-size: 16px;
  font-weight: 700;
  margin: 10px 0;
`;

const SignUp = () => (
  <AuthLayout>
    <PageTitle title="Sign up" />
    <WhiteBox>
      <AuthTitle />
      <AuthSubTitle>친구들의 사진과 동영상을 보려면 가입하세요.</AuthSubTitle>
      <InputButton>
        <FontAwesomeIcon icon={faFacebookSquare} />
        <span>Facebook 으로 로그인</span>
      </InputButton>
      <AuthOrLine />
      <form action="">
        <InputText type="text" placeholder="휴대폰 번호 또는 이메일" />
        <InputText type="text" placeholder="성명" />
        <InputText type="text" placeholder="사용자 이름" />
        <InputText type="password" placeholder="비밀번호" />
        <InputSubmitButton type="submit" value="가입" />
      </form>
    </WhiteBox>
    <AuthBottomBox
      cta="계정이 있으신가요?"
      path={routes.home}
      linkText="로그인하기"
    />
  </AuthLayout>
);

export default SignUp;
