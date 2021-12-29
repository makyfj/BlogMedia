import React from "react";
import Link from "next/link";

const SignUpPage = () => {
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
        <div className="flex justify-center">
          <form className="form">
            <div className="label">
              <label htmlFor="name">Name</label>
            </div>
            <div>
              <input type="text" id="name" className="input" />
            </div>

            <div className="label">
              <label htmlFor="name">Name</label>
            </div>
            <div>
              <input type="text" id="name" className="input" />
            </div>
            <div className="label">
              <label htmlFor="name">Name</label>
            </div>
            <div>
              <input type="text" id="name" className="input" />
            </div>
            <div className="label">
              <label htmlFor="name">Name</label>
            </div>
            <div>
              <input type="text" id="name" className="input" />
            </div>
            <div className="flex flex-col">
              <button>Hi</button>
            </div>
          </form>
        </div>
      </div>
      <div className="mb-4" />
    </>
  );
};

export default SignUpPage;
