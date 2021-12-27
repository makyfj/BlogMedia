import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";

const SIGNIN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(credentials: { password: $password, email: $email }) {
      userErrors {
        message
      }
      token
    }
  }
`;

export default function Signin() {
  const [signin, { data, loading }] = useMutation(SIGNIN);

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    signin({
      variables: {
        email,
        password,
      },
    });
  };

  console.log(data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.signin.userErrors.length) {
        setError(data.signin.userErrors[0].message);
      }

      if (data.signin.token) {
        localStorage.setItem("token", data.signin.token);
        setError(null);
      }
    }
  }, [data]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signin</Button>
      </Form>
    </div>
  );
}
