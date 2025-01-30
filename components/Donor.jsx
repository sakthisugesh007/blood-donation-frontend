import React, { useState } from "react";
import axios from "axios";
import "../src/styles/donor.css";

const Donor = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/donations", {
        name: formData.name,
        bloodGroup: formData.bloodGroup,
        location: formData.location,
        phone:formData.phone,
      });

      console.log("API Response:", response.data);

      // Validate the API response before updating requests
      if (response.data.success && response.data.donation) {
        setRequests([...requests, response.data.donation]); // Add the new request
        alert("Donation request added successfully!");

        // Optional: Update availability
        const availabilityResponse = await axios.get(
          "http://localhost:5000/api/availability"
        );
        console.log("Updated Availability:", availabilityResponse.data);
      } else {
        console.error("Invalid response data:", response.data);
        alert("Error: Unexpected response from the server.");
      }

      setFormData({ name: "", bloodGroup: "", location: "" ,phone: ""}); // Reset the form
    } catch (error) {
      console.error("Error submitting donation request:", error.message);
      alert("Error submitting donation request. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <h1>Blood Donation Platform</h1>
      <form className="add-request-form" onSubmit={handleFormSubmit}>
        <h2>Add New Donation Request</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />

        {/* Blood Group Dropdown */}
        <label htmlFor="bloodGroup">Select Blood Group:</label>
        <select
          name="bloodGroup"
          id="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleInputChange}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
        />
        <input
        type="text"
        name="phone"
        placeholder="Phone"
        valur={formData.phone}
        onChange={handleInputChange}
        />
        <button type="submit">Add Request</button>
      </form>

      <div className="request-list">
        <h2>Donation Requests</h2>
        <ul>
          {requests.map((request, index) => (
            <li key={index}>
              <strong>{request.name}</strong> - {request.bloodGroup} <br />
              Location: {request.location}
              <br/>
              Phone: {request.phone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Donor;
