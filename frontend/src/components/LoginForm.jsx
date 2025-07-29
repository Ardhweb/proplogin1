import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [fieldData, setfieldData] = useState({});
  const [error, setError] = useState();

  const handleChange = (event) => {
    setfieldData({
      ...fieldData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //alert(inputs);

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: fieldData.username,
          password: fieldData.passcode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        //alert('Data submitted successfully!');
        //console.log(data);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: data.token,
            user: data.user,
          })
        );
        navigate("/");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to submit data");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 w-100 rounded"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="username"
          value={fieldData.username}
          type="text"
          placeholder="Enter usernmae"
        />
        <Form.Text className="text-muted">
          We'll never share your username with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="passcode"
          value={fieldData.passcode}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
