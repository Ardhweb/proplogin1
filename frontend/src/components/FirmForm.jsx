import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const AddForm = ({ show, handleClose,onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    let token = null;
    const authRaw = localStorage.getItem('auth');
    if (authRaw) {
      const authData = JSON.parse(authRaw);
      token = authData.token;
    }

    try {
      const response = await fetch("http://localhost:8000/api/firm/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // console.log(data);
        alert("Firm registered successfully!");
         if (onSuccess) onSuccess();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to submit data");
    }

    handleClose(); // Close modal after submit
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Organization/Firm Registration Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Your Firm Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter organization/firm name"
              name="firm_name"
              value={formData.firm_name || ""}
              onChange={handleChange}
              required
            />

            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              required
            />

            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter contact email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />

            <Form.Label>Tax ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tax ID"
              name="tax_id"
              value={formData.tax_id || ""}
              onChange={handleChange}
              required
            />

            <Form.Label>GSTIN</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter GSTIN"
              name="gstin"
              value={formData.gstin || ""}
              onChange={handleChange}
              required
            />

            <Form.Label>Your Firm Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter firm address"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              required
            />

            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              required
            />

            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="mt-3 d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="ms-2" variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
