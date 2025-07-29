import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function  UserRegisterForm(){
    const [fieldData , setfieldData] = useState({}); // we using {} for state cause we storing all form data as dict.
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);

    const handleChange = (event) => {
       setfieldData({
      ...fieldData,
      [event.target.name]: event.target.value
    });


      }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        //alert(inputs);

      try {
      const response = await fetch('http://localhost:8000/api/user/register/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        username: fieldData.username,
        password: fieldData.passcode,
        email: fieldData.email,
      })
      });

      const data = await response.json();

      if (response.ok) {
        //alert('Data submitted successfully!');
        console.log(data);
        navigate('/login');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to submit data');
    }
    }

    return (
      <form
  onSubmit={handleSubmit}
  className="bg-light w-25 p-4 rounded position-absolute top-50 start-50 translate-middle"
>
  <h3>Signup-Create New User Account</h3>

  <div className="mb-3">
    <label htmlFor="username">Username:</label>
    <input
      id="username"
      className="form-control"
      type="text"
      name="username"
      value={fieldData.username}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="email">Email:</label>
    <input
      id="email"
      className="form-control"
      type="email"
      name="email"
      value={fieldData.email}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="passcode">Password:</label>
    <input
      id="passcode"
      className="form-control"
      type="password"
      name="passcode"
      value={fieldData.passcode}
      onChange={handleChange}
    />
  </div>

  <input className="btn btn-secondary" type="submit" value="Submit" />
</form>

    )


}