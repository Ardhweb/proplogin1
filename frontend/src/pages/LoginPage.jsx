import React from 'react';
import LoginForm from '../components/LoginForm';
import OtherLayout from '../layouts/OtherLayout';

function Login() {
  return (
     <><OtherLayout>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className=''>
          <h2>Login now</h2>
          <LoginForm />
        </div>
      </div>
        
      </OtherLayout></>
  
  );
}
export default Login;
