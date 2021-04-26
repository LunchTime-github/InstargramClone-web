import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import {
  FacebookLogin,
  InputSubmitButton,
  InputText,
} from "../components/auth/Inputs";
import WhiteBox from "../components/shared/WhiteBox";
import AuthOrLine from "../components/auth/AuthOrLine";
import AuthTitle from "../components/auth/AuthTitle";
import AuthBottomBox from "../components/auth/AuthBottomBox";
import routes from "../routes";

const Login = () => (
  <AuthLayout>
    <WhiteBox>
      <AuthTitle />
      <form action="">
        <InputText
          type="text"
          placeholder="전화번호, 사용자 이름 또는 이메일"
        />
        <InputText type="password" placeholder="비밀번호" />
        <InputSubmitButton type="submit" value="로그인" />
      </form>
      <AuthOrLine />
      <FacebookLogin>
        <FontAwesomeIcon icon={faFacebookSquare} />
        <span>Facebook 으로 로그인</span>
      </FacebookLogin>
    </WhiteBox>
    <AuthBottomBox
      cta="계정이 없으신가요?"
      path={routes.signUp}
      linkText="가입하기"
    />
  </AuthLayout>
);

export default Login;
