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
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { accountMsg } from "../apollo";

const AuthSubTitle = styled.h6`
  font-size: 16px;
  font-weight: 700;
  margin: 10px 0;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    formState: { isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const history = useHistory();

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      const {
        createAccount: { ok, error },
      } = data;

      if (!ok) {
        setError("result", {
          message: error,
        });
        return;
      }

      const { username, password } = getValues();

      accountMsg({
        message: "계정이 생성되었습니다.",
        username,
        password,
      });
      history.push(routes.home);
    },
    onError: () => {
      setError("result", {
        message: "동일한 이름 혹은 이메일을 가진 사용자가 있습니다",
      });
    },
  });

  const onSubmitVaild = useCallback(
    (data) => {
      if (loading) {
        return;
      }
      createAccount({
        variables: { ...data },
      });
    },
    [createAccount, loading]
  );

  const clearSignupError = useCallback(() => clearErrors("result"), [
    clearErrors,
  ]);

  return (
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
        <form onSubmit={handleSubmit(onSubmitVaild)}>
          <InputText
            type="text"
            ref={register({
              required: {
                value: true,
                message: "성을 입력해주세요",
              },
            })}
            onChange={clearSignupError}
            name="firstName"
            placeholder="*성"
          />
          {errors?.firstName?.message}
          <InputText
            type="text"
            ref={register({
              required: {
                value: false,
                message: "이름을 입력해주세요",
              },
            })}
            onChange={clearSignupError}
            name="lastName"
            placeholder="이름"
          />
          {errors?.lastName?.message}
          <InputText
            type="text"
            ref={register({
              required: {
                value: true,
                message: "사용자 이름을 입력해주세요",
              },
              minLength: {
                value: 5,
                message: "5자 이상 입력해주세요",
              },
            })}
            onChange={clearSignupError}
            name="username"
            placeholder="*사용자 이름"
          />
          {errors?.username?.message}
          <InputText
            type="text"
            ref={register({
              required: {
                value: true,
                message: "이메일을 입력해주세요",
              },
              minLength: {
                value: 0,
                message: "5자 이상 입력해주세요",
              },
              validate: (v) =>
                v.includes("@") && v.includes(".")
                  ? true
                  : "정확한 이메일을 입력해주세요",
            })}
            onChange={clearSignupError}
            name="email"
            placeholder="*이메일"
          />
          {errors?.email?.message}
          <InputText
            type="password"
            ref={register({
              required: {
                value: true,
                message: "비밀번호을 입력해주세요",
              },
            })}
            onChange={clearSignupError}
            name="password"
            placeholder="*비밀번호"
          />
          {errors?.password?.message}
          <InputSubmitButton
            type="submit"
            value={loading ? "가입 중..." : "가입하기"}
            disabled={!isValid || loading}
          />
          {errors?.result?.message}
        </form>
      </WhiteBox>
      <AuthBottomBox
        cta="계정이 있으신가요?"
        path={routes.home}
        linkText="로그인하기"
      />
    </AuthLayout>
  );
};

export default SignUp;
