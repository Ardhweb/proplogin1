import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const EditForm = ({ show, handleClose, firmData, selectedId, onSuccess }) => {
  const [editformData, seteditFormData] = useState({});
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    if (selectedId && firmData.length > 0) {
      const selectedFirm = firmData.find((firm) => firm.id === selectedId);
      if (selectedFirm) {
        seteditFormData({ ...selectedFirm }); // clone to avoid mutating original
        setOriginalData({ ...selectedFirm });
      }
    }
  }, [selectedId, firmData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalData) return;

    const changedFields = {};
    let changedCount = 0;
    const totalFields = Object.keys(originalData).length;

    Object.keys(originalData).forEach((key) => {
      if (editformData[key] !== originalData[key]) {
        changedFields[key] = editformData[key];
        changedCount++;
      }
    });

    if (changedCount === 0) {
      alert("No changes detected.");
      return;
    }

    const method = changedCount === totalFields ? 'PUT' : 'PATCH';

    let token = null;
    const authRaw = localStorage.getItem('auth');
    if (authRaw) {
      const authData = JSON.parse(authRaw);
      token = authData.token;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/firm/${selectedId}/`, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(method === 'PUT' ? editformData : changedFields),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Firm updated successfully!');
        if (onSuccess) onSuccess();
        handleClose();
      } else {
        alert('Error: ' + (data.message || JSON.stringify(data)));
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update data.');
    }
  };

  if (!originalData) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Firm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {[
            { label: 'Firm Name', name: 'firm_name' },
            { label: 'Phone', name: 'phone' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Tax ID', name: 'tax_id' },
            { label: 'GSTIN', name: 'gstin' },
            { label: 'Address', name: 'address' },
            { label: 'City', name: 'city' },
            { label: 'Country', name: 'country' },
          ].map((field) => (
            <Form.Group key={field.name} className="mb-2">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type || 'text'}
                name={field.name}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={editformData[field.name] || ''}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}

          <div className="mt-3 d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="ms-2" variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
