import Container from "react-bootstrap/Container";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function UpdateUser(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);
  const navigatesTo = useNavigate();
  let { id } = useParams();

  let defaultFormValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValue] = useState(defaultFormValues);

  let UpdatedUserDetails = { email: email, password: password };

  useEffect(() => {
    fetch("http://localhost:3001/myusers/" + id, {
      method: "GET",
    })
      .then((res) => {
        // console.log(res);

        // // console.log(formValues);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setemail(res.email);
        setpassword(res.password);
        // console.log(formValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(formValues);

  function verifyAndUpdate(event) {
    event.preventDefault();

    if (email.length <= 6 || password.length <= 6) {
      setError(true);
    }

    let options = {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdatedUserDetails),
    };

    if (email.length > 6 && password.length > 6) {
      fetch("http://localhost:3001/myusers/" + id, options)
        .then((res) => {
          console.log(res);
          navigatesTo("/");
          localStorage.clear();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <>
      <Container className="mt-5 w-75 mx-auto bg-info p-3">
        <Row className="m-auto">
          <Col className=" mx-auto mt-5 p-5" lg={6} md={12}>
            <Form onSubmit={verifyAndUpdate}>
              <Form.Group className="mb-5  w-100" controlId="formBasicEmail">
                <Form.Label className="mb-3">Email address</Form.Label>
                <Form.Control
                  value={email}
                  type="email"
                  placeholder="Enter NewEmail"
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

              <Form.Group className="mb-5  w-100" controlId="formBasicEmail">
                <Form.Label className="mb-3">Password</Form.Label>
                <Form.Control
                  value={password}
                  type="text"
                  placeholder="set NewPassword"
                  onChange={(event) => setpassword(event.target.value)}
                />
                {error && password.length <= 6 ? (
                  <Form.Label className="text-danger">
                    password can't be empty and must have more than 6 characters
                  </Form.Label>
                ) : (
                  ""
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UpdateUser;
