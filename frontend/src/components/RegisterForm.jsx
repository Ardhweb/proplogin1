import { useState } from "react";

export function  UserRegisterForm(){
    const [fieldData , setfieldData] = useState({}); // we using {} for state cause we storing all form data as dict.
    
    const handleChange = (event) => {
        const username = event.target.username;
        const value = event.target.value;
        setfieldData(values => ({...values, [username]: value}))
      }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        //alert(inputs);
    }

    return (
      <form
  onSubmit={handleSubmit}
  className="bg-light w-25 p-4 rounded position-absolute top-50 start-50 translate-middle"
>
  <h3>Signup</h3>

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