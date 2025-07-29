import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Firm() {
  const [firmData, setfirmData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
            Authorization: `Token ${token}`, // Use template string properly here
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

    fetchFirms();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Firm</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {/* {firmData.length === 0 && !error && <p>No firm data available.</p>} */}

        {firmData.map((firm, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{firm.firm_name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Firm;
