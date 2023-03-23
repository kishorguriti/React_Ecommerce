import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(false);
  const [signUpResult, setSignupresult] = useState("");
  const navigatesTo = useNavigate();

  let myUserDetails = { email: email, password: password };

  function gotoLoginPage() {
    props.onCreate();
  }

  function onSubmitting(event) {
    event.preventDefault();

    if (email.length <= 6 || password.length <= 6) {
      setError(true);
    }

    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(myUserDetails),
    };

    if (email.length > 6 && password.length > 6) {
      fetch("http://localhost:3001/myusers", options)
        .then(function (res) {
          return res.json();
        })
        .then(function (res) {
          console.log(res);
          if (res.err === "user already exist") {
            setSignupresult("user already exist");
          } else {
            setSignupresult("User Account Created successfully ");
          }
        })

        .catch(function (err) {
          console.log(err);
        });
    }

    setemail("");
    setpassword("");
    setRePassword("");
    setMobile("");
  }

  return (
    <>
      <Container className="mt-5 w-75 mx-auto bg-info p-3">
        <Row className="m-auto">
          <Col className="p-5 mx-auto mt-5" lg={6} md={12}>
            <Form onSubmit={onSubmitting}>
              <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setemail(event.target.value)}
                />
                {error && email.length <= 6 ? (
                  <Form.Label className="text-danger">
                    Email can't be empty and must have min 6 characters
                  </Form.Label>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setpassword(event.target.value)}
                />
                {error && password.length <= 6 ? (
                  <Form.Label className="text-danger">
                    Password can't be empty and Must Have min 6 characters
                  </Form.Label>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-3 w-100" controlId="formBasicRPassword">
                <Form.Label>Re-Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-Enter Password"
                  value={RePassword}
                  onChange={(event) => setRePassword(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 w-100" controlId="formBasicRPassword">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Mobile"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                />
                {/* {error && email.length <= 6 ? (
                  <Form.Label className="text-danger">
                    Enter Mobile , it can't be empty
                  </Form.Label>
                ) : (
                  ""
                )} */}
              </Form.Group>

              <Button variant="primary" type="submit">
                SignUp
              </Button>

              <p className="mt-5">{signUpResult}</p>

              <Button variant="success" onClick={gotoLoginPage}>
                Back To Login
              </Button>
            </Form>
          </Col>

          <Col lg={6} md={12}>
            <img
              src="https://img.freepik.com/premium-vector/office-staff-work-business-people-brainstorming-effective-teamwork-man-sits-computer-table-woman-helps-gives-advice-colleague-workers-cooperation-employees-activities-vector-concept_533410-226.jpg?w=360"
              className="w-100 h-75 my-5 pt-3"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUp;
