import React, { useEffect, useState } from 'react';
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProfileDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 const authRaw = localStorage.getItem('auth');
  let token = null;

  useEffect(() => {
   
    if (authRaw) {
      try {
        const authData = JSON.parse(authRaw);
        token = authData.token;
      } catch (e) {
        console.warn("Invalid auth data in localStorage.");
      }
    }

    if (!token) {
      setError("User is not authenticated.");
      setLoading(false);
      navigate("/login"); // Optional: redirect to login page
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized. Please log in again.");
            navigate("/login");
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }


  const handleDeleteAccount = async (userId) => {
  if (!authRaw) return;

  const { token } = JSON.parse(authRaw);

  try {
    const response = await fetch(`http://localhost:8000/api/user/${userId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (response.ok) {
      // Remove auth token from localStorage
      localStorage.removeItem('auth');
      navigate('/login');
    } else {
      alert('Deletion failed!');
    }
  } catch (error) {
    console.error('error:', error);
    alert('Logout error!');
  }
};


  return (
    <>
      <h3 className='container '>User Profile Settings</h3>
      <div className="container d-flex flex-row border-bottom p-5">
        
        <Image
          
          roundedCircle
          width={120}
          height={120}
          className="me-5 border border-primary border-2"
        />
        <div className="d-flex flex-column justify-content-start align-self-center mt-2">
          <p className="fs-4 m-0">
            <small>Username: </small>
            {user.username}</p>
          <p className="fs-5">
            <small>Email: </small>
            {user.email ? user.email : "(No email.)"}
            {user.id}
            </p>
        
          <div className='d-flex'>
             <Button
            variant="primary"
            size="md m-2"
            className=""
           
          >
            Edit Info
          </Button>

          <Button
            variant="danger"
            size="md m-2"
            className=""
          onClick={() => handleDeleteAccount(user.id)}

          >
            Delete Account
          </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
