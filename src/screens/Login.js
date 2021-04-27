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
import PageTitle from "../components/shared/PageTitle";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { accountMsg, logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: accountMsg()?.username || "",
      password: accountMsg()?.password || "",
    },
  });

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const {
        login: { ok, token, error },
      } = data;

      if (!ok) {
        setError("result", {
          message: error,
        });
      }

      if (token) {
        logUserIn(token);
      }
    },
  });

  const onSubmitVaild = useCallback(() => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  }, [getValues, loading, login]);

  const clearLoginError = useCallback(() => clearErrors("result"), [
    clearErrors,
  ]);

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <WhiteBox>
        <AuthTitle />
        {accountMsg()?.message}
        <form onSubmit={handleSubmit(onSubmitVaild)}>
          <InputText
            ref={register({
              required: {
                value: true,
                message: "username is not required",
              },
              minLength: {
                value: 5,
                message: "Username should be longer then 5 chars",
              },
            })}
            name="username"
            onChange={clearLoginError}
            type="text"
            placeholder="전화번호, 사용자 이름 또는 이메일"
          />
          {errors?.username?.message}
          <InputText
            ref={register({
              required: {
                value: true,
                message: "password is not required",
              },
            })}
            name="password"
            onChange={clearLoginError}
            type="password"
            placeholder="비밀번호"
          />
          {errors?.password?.message}
          <InputSubmitButton
            type="submit"
            value={loading ? "로그인 중..." : "로그인"}
            disabled={!isValid || loading}
          />
          {errors?.result?.message}
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
};

export default Login;
