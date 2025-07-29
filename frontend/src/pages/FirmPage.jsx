import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddForm } from "../components/FirmForm";
import { Button } from "react-bootstrap";

function Firm() {
  const [showModal, setShowModal] = useState(false);
  const [firmData, setfirmData] = useState([]);
  const [error, setError] = useState(null);
  const authRaw = localStorage.getItem("auth");
  if (!authRaw) {
    setError("User not authenticated");
    return;
  }

  let token = null;

  const authData = JSON.parse(authRaw);
  token = authData.token;
  //alert(token)

  const fetchFirms = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/firm/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      const res = await response.json();

      if (response.ok) {
        setfirmData(res.data);
      } else {
        setError(res.message || "Error fetching data");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch firm data");
    }
  };

  const deleteFirm = async (event) => {
    const firmId = event.target.value;
    try {
      const response = await fetch(
        `http://localhost:8000/api/firm/${firmId}/`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchFirms();
      } else {
        setError(res.message || "Error delete data");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch firm data");
    }
  };

  useEffect(() => {
    fetchFirms();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Firm</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add new firm
      </Button>

      <AddForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSuccess={fetchFirms}
      />
      {error && <div className="alert alert-danger">{error}</div>}

      {firmData.length === 0 && !error && <p>No firm data available.</p>}
      <div className="row ">
        {firmData.map((firm, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  {firm.firm_name}{" "}
                  <Button
                    onClick={deleteFirm}
                    value={firm.id}
                    variant="danger"
                    size="sm"
                  >
                    Delete/Remove
                  </Button>
                </h5>
              </div>

              <ul className="list-group list-group-flush ">
                <li className="list-group-item">Tax Id: {firm.tax_id}</li>
                <li className="list-group-item">GSTIN: {firm.gstin}</li>
                <li className="list-group-item">Phone: {firm.phone}</li>
                <li className="list-group-item">
                  Email: {firm.email || "No Email details"}
                </li>
                <li className="list-group-item">Address : {firm.address}</li>
                <li className="list-group-item">Country: {firm.country}</li>
                <li className="list-group-item">City: {firm.city}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Firm;
