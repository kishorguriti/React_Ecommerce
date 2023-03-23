import Container from "react-bootstrap/Container";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { json, useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const navigatesTo = useNavigate();

  function validateDetails(res) {
    res.forEach((user) => {
      if (user.email === email && user.password === password) {
        console.log("successfully logged in");
        localStorage.setItem("users", JSON.stringify(email));
        setLoginError(false);
        navigatesTo("/dashboard");
      } else {
        //console.log("faild to login")
        setLoginError(true);
      }
    });
  }

  function gettingUserAndValidate(event) {
    event.preventDefault();

    if (email.length < 6 || password.length < 6) {
      setError(true);
    }

    fetch("http://localhost:3001/myusers")
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log(res); // is an array
        validateDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Container className="mt-5 w-75 mx-auto bg-info p-3">
        <Row className="m-auto">
          <Col className=" mx-auto mt-5 p-5" lg={6} md={12}>
            <Form onSubmit={gettingUserAndValidate}>
              <Form.Group className="mb-5  w-100" controlId="formBasicEmail">
                <Form.Label className="mb-3">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(event) => setemail(event.target.value)}
                />
                {error && email.length <= 6 ? (
                  <Form.Label className="text-danger">
                    Email can't be empty and must have more than 6 characters
                  </Form.Label>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-4 w-100" controlId="formBasicPassword">
                <Form.Label className="mb-3">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setpassword(event.target.value)}
                />
                {error && password.length <= 6 ? (
                  <Form.Label className="text-danger">
                    password can't be empty and must havemore than 6 characters
                  </Form.Label>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-4 w-100" controlId="formBasicPassword">
                <Form.Label className="mb-3">Employe ID</Form.Label>
                <Form.Control type="text" placeholder="Enter Employe ID" />
              </Form.Group>

              <Button variant="primary" type="submit">
                LogIn
              </Button>

              <Button
                variant="success"
                className="mx-3"
                type="submit"
                onClick={props.onCreate}
              >
                Create Account
              </Button>

              {!loginError ? (
                <p></p>
              ) : (
                <p className="fs-6 mt-4 text-danger">
                  Login Failed Please Give Valid details
                </p>
              )}

              <p className="mt-4 fs-5">
                Don't Have Account ?{" "}
                <span className="text-primary" onClick={props.onCreate}>
                  click on Create Account
                </span>
              </p>
            </Form>
          </Col>

          <Col lg={6} md={12}>
            <img
              src="https://img.freepik.com/vecteurs-libre/concept-abstrait-du-systeme-controle-acces_335657-3180.jpg"
              className="w-100 h-75 my-5 pt-3"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
