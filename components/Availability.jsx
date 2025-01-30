
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/styles/Availability.css";

const Availability = () => {
  const [bloodData, setBloodData] = useState([]);
  const [error, setError] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Fetch availability data from the backend
  const fetchAvailability = async (bloodType = "") => {
    try {
      const url = bloodType
        ? `http://localhost:5000/api/availability?bloodType=${bloodType.toUpperCase()}`
        : "http://localhost:5000/api/availability";

      const response = await axios.get(url);
       console.log("",response.data)
      if (response.data.success) {
        setBloodData(response.data.availability);
        setIsDataFetched(true);
      }
    } catch (error) {
      console.error("Error fetching availability data:", error.message);
      setError("Failed to load availability data. Please try again.");
      setIsDataFetched(false);
    }
  };

  // Handle blood type change in the dropdown
  const handleBloodTypeChange = (e) => {
    setSelectedBloodType(e.target.value);
  };

  // Handle Search Button Click to fetch the data
  const handleSearchClick = () => {
    if (selectedBloodType) {
      fetchAvailability(selectedBloodType);
    } else {
      setError("Please select a blood type to search.");
      setIsDataFetched(false);
    }
  };

  const availableBloodData = bloodData.filter(
    (data) => data.bloodType === selectedBloodType.toUpperCase()
  );

  return (
    <div className="availability-container">
      <h1>
        <span className="blood-symbol">💉</span> Blood Donation Availability
      </h1>
      <p>Check the availability of blood for different blood types.</p>

      {error && <p className="error-message">{error}</p>}

      <div className="filter-section">
        <label htmlFor="blood-type">Filter by Blood Type: </label>
        <select
          id="blood-type"
          value={selectedBloodType}
          onChange={handleBloodTypeChange}
        >
          <option value="">All Blood Types</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <button onClick={handleSearchClick}>Search</button>
      </div>

      {/* Only display table when data is fetched */}
      {isDataFetched && (
        <table className="availability-table">
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Available Units</th>
              <th>Location</th>
              <th>Phone</th> {/* New column for phone number */}
            </tr>
          </thead>
          <tbody>
            {availableBloodData.length > 0 ? (
              availableBloodData.map((data, index) => (
                <tr key={index}>
                  <td>{data.bloodType}</td>
                  <td>{data.availableUnits}</td>
                  <td>{data.location}</td>
                  <td>{data.phone}</td> {/* Display phone number */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  No available blood donations for the selected blood type.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Availability;
