import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import ErrorMutation from "../components/errorMutation";
import Spinner from "../components/spinner";
import { ME_QUERY } from "../components/header";

const SIGN_IN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(credentials: { email: $email, password: $password }) {
      userErrors {
        message
      }
      token
    }
  }
`;

interface SignInInputs {
  email: string;
  password: string;
}

const SignInPage = () => {
  const router = useRouter();

  const [errorMutation, setErrorMutation] = useState<string | null>(null);

  const [signin, { data, loading, reset }] = useMutation(SIGN_IN_MUTATION, {
    refetchQueries: [ME_QUERY],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>();

  const onSubmit: SubmitHandler<SignInInputs> = (data) => {
    signin({ variables: data });
  };

  useEffect(() => {
    if (data) {
      const { token, userErrors } = data.signin;

      if (userErrors.length) {
        setErrorMutation(userErrors[0].message);
        reset();
      }

      if (token === null) {
        reset();
      }

      if (token) {
        setErrorMutation(null);
        localStorage.setItem("token", token);
        router.push("/");
      }
    }
  }, [data, reset, router]);

  return (
    <>
      <h1 className="heading">Welcome Blogger!</h1>
      <p className="paragraph">
        Do you need to create an account?{" "}
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </p>

      <div className="form-container">
        {errorMutation && <ErrorMutation errorMutation={errorMutation} />}
        {loading && <Spinner />}
        <div className="flex justify-center">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="label">
              <label htmlFor="email">Email</label>
            </div>

            <div>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "The email field is required",
                })}
                className="input"
              />
              {errors.email && (
                <p className="input-error-form">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="label">
              <label htmlFor="password">Password</label>
            </div>

            <div>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "The password field is required",
                  minLength: {
                    value: 5,
                    message: "Length should be 5 characters",
                  },
                })}
                className="input"
              />
              {errors.password && (
                <p className="input-error-form">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}

            <div className="button-container">
              <button className="button" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mb-4" />
    </>
  );
};

export default SignInPage;
