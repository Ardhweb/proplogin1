import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProfileDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: ""
  });

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
      navigate("/login");
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

  const handleDeleteAccount = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

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

  const handleEditClick = () => {
    setEditData({
      username: user.username || "",
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || ""
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const updateUser = async () => {
    const { token } = JSON.parse(authRaw);

    const fieldsChanged = Object.keys(editData).some(
      key => editData[key] !== (user[key] || "")
    );

    if (!fieldsChanged) {
      alert("No changes detected.");
      return;
    }

    const allChanged = Object.keys(editData).every(
      key => editData[key] !== (user[key] || "")
    );

    const method = allChanged ? "PUT" : "PATCH";

    try {
      const response = await fetch(`http://localhost:8000/api/user/${user.id}/`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setShowModal(false);
      } else {
        alert(`Update failed! Status: ${response.status}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred while updating.");
    }
  };

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <>
      <h3 className='container'>User Profile Settings</h3>
      <div className="container d-flex flex-row border-bottom p-5">
        <Image
          roundedCircle
          width={120}
          height={120}
          className="me-5 border border-primary border-2"
          src="https://via.placeholder.com/120"
          alt="avatar"
        />
        <div className="d-flex flex-column justify-content-start align-self-center mt-2">
          <p className="fs-4 m-0"><small>Username:</small> {user.username}</p>
          <p className="fs-5"><small>Email:</small> {user.email || "(No email)"} </p>
          <p className="fs-5"><small>First Name:</small> {user.first_name || "(none)"} </p>
          <p className="fs-5"><small>Last Name:</small> {user.last_name || "(none)"} </p>

          <div className='d-flex'>
            <Button variant="primary" className="m-2" onClick={handleEditClick}>
              Edit Info
            </Button>

            <Button
              variant="danger"
              className="m-2"
              onClick={() => handleDeleteAccount(user.id)}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Editing Profile */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername" className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editData.username}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editData.email}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formFirstName" className='mb-3'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={editData.first_name}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className='mb-3'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={editData.last_name}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileDetails;
