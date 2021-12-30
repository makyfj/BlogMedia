import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import ErrorMutation from "../components/errorMutation";
import Spinner from "../components/spinner";

const SIGN_UP_MUTATION = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $name: String!
    $bio: String!
  ) {
    signup(
      credentials: { email: $email, password: $password }
      name: $name
      bio: $bio
    ) {
      userErrors {
        message
      }
      token
    }
  }
`;

interface SignUpInputs {
  name: string;
  password: string;
  email: string;
  bio: string;
}

const SignUpPage = () => {
  const router = useRouter();

  const [errorMutation, setErrorMutation] = useState<string | null>(null);

  const [signup, { data, loading, reset }] = useMutation(SIGN_UP_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    signup({ variables: data });
  };

  useEffect(() => {
    if (data) {
      const { token, userErrors } = data.signup;

      if (userErrors.length) {
        setErrorMutation(userErrors[0].message);
      } else {
        setErrorMutation(null);
      }

      if (token === null) {
        reset();
      }

      if (token) {
        localStorage.setItem("token", token);
      }
    }
  }, [data, reset, router]);

  return (
    <>
      <h1 className="heading">Welcome Blogger!</h1>
      <p className="paragraph">
        Already a member?{" "}
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      </p>

      <div className="form-container">
        {errorMutation && <ErrorMutation errorMutation={errorMutation} />}
        {loading && <Spinner />}
        <div className="flex justify-center">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="label">
              <label htmlFor="name">Name</label>
            </div>
            <div>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "The name field is required",
                })}
                className="input"
              />
              {errors.name && (
                <p className="input-error-form">{errors.name.message}</p>
              )}
            </div>

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

            <div className="label">
              <label htmlFor="bio">Bio</label>
            </div>
            <div>
              <input
                type="text"
                id="bio"
                {...register("bio", { required: "The bio field is required" })}
                className="input"
              />
              {errors.bio && (
                <p className="input-error-form">{errors.bio.message}</p>
              )}
            </div>

            <div className="button-container">
              <button className="button" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mb-4" />
    </>
  );
};

export default SignUpPage;
