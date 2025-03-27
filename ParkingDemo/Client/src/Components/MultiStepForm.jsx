import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:9000/api/v1"; // Adjust based on your server

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    Address: { Area: "", City: "", State: "", Country: "", Zip: "" },
    Building: { Name: "", Address: "" },
    Wing: { Wname: "", Total_Floor: "", Building: "", Address: "" },
    Flat: { Flat_Number: "", Building: "", Wing: "" },
    Owner: {
      Owner_Name: "",
      Family_Count: "",
      Contact_Number: "",
      Vehicle_Count: "",
      Vehicle_Details: [],
      Building: "",
      Wing: "",
      Flat: "",
    },
  });

  const [dropdownData, setDropdownData] = useState({
    addresses: [],
    buildings: [],
    wings: [],
    flats: [],
  });

  useEffect(() => {
    fetchDropdownData();
  }, [step]);

  const fetchDropdownData = async () => {
    try {
      if (step === 2) {
        const res = await axios.get(`${API_BASE}/get-all-address`);
        console.log("Fetched Addresses:", res.data);
        setDropdownData({ ...dropdownData, addresses: res.data });
      }
      if (step === 3) {
        const res = await axios.get(`${API_BASE}/get-all-building`);
        setDropdownData({ ...dropdownData, buildings: res.data });
      }
      if (step === 4) {
        const res = await axios.get(`${API_BASE}/get-all-wing`);
        setDropdownData({ ...dropdownData, wings: res.data });
      }
      if (step === 5) {
        const res = await axios.get(`${API_BASE}/get-all-flat`);
        setDropdownData({ ...dropdownData, flats: res.data });
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const handleChange = (e) => {
    const updatedStepKey = getCurrentStepKey();
    setFormData({
      ...formData,
      [updatedStepKey]: { ...formData[updatedStepKey], [e.target.name]: e.target.value },
    });
  };

  const getCurrentStepKey = () => {
    return ["Address", "Building", "Wing", "Flat", "Owner"][step - 1];
  };

  const handleSubmit = async () => {
    try {
      let apiEndpoint;
      switch (step) {
        case 1:
          apiEndpoint = "/create-address";
          break;
        case 2:
          apiEndpoint = "/Create-building";
          break;
        case 3:
          apiEndpoint = "/create-wing";
          break;
        case 4:
          apiEndpoint = "/create-flat";
          break;
        case 5:
          apiEndpoint = "/create-owner";
          break;
        default:
          return;
      }

      const res = await axios.post(`${API_BASE}${apiEndpoint}`, formData[getCurrentStepKey()]);
      alert("Data saved successfully!");

      if (step < 5) setStep(step + 1);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {step === 1 && "Enter Address"}
        {step === 2 && "Enter Building Details"}
        {step === 3 && "Enter Wing Details"}
        {step === 4 && "Enter Flat Details"}
        {step === 5 && "Enter Owner Details"}
      </h2>

      {step === 1 && (
        <>
          <input type="text" name="Area" value={formData.Address.Area} onChange={handleChange} placeholder="Area" className="w-full p-2 border rounded mb-2" />
          <input type="text" name="City" value={formData.Address.City} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded mb-2" />
          <input type="text" name="State" value={formData.Address.State} onChange={handleChange} placeholder="State" className="w-full p-2 border rounded mb-2" />
          <input type="text" name="Country" value={formData.Address.Country} onChange={handleChange} placeholder="Country" className="w-full p-2 border rounded mb-2" />
          <input type="text" name="Zip" value={formData.Address.Zip} onChange={handleChange} placeholder="Zip Code" className="w-full p-2 border rounded mb-2" />
        </>
      )}

      {step === 2 && (
        <>
          <input type="text" name="Name" value={formData.Building.Name} onChange={handleChange} placeholder="Building Name" className="w-full p-2 border rounded mb-2" />
          <select name="Address" value={formData.Building.Address} onChange={handleChange} className="w-full p-2 border rounded mb-2">
            <option value="">Select Address</option>
            {dropdownData.addresses.map((addr) => (
              <option key={addr._id} value={addr._id}>{addr.City}, {addr.State}</option>
            ))}
          </select>
        </>
      )}

      {step === 3 && (
        <>
          <input type="text" name="Wname" value={formData.Wing.Wname} onChange={handleChange} placeholder="Wing Name" className="w-full p-2 border rounded mb-2" />
          <input type="number" name="Total_Floor" value={formData.Wing.Total_Floor} onChange={handleChange} placeholder="Total Floors" className="w-full p-2 border rounded mb-2" />
          <select name="Building" value={formData.Wing.Building} onChange={handleChange} className="w-full p-2 border rounded mb-2">
            <option value="">Select Building</option>
            {dropdownData.buildings.map((bld) => (
              <option key={bld._id} value={bld._id}>{bld.Name}</option>
            ))}
          </select>
        </>
      )}

      {step === 4 && (
        <>
          <input type="text" name="Flat_Number" value={formData.Flat.Flat_Number} onChange={handleChange} placeholder="Flat Number" className="w-full p-2 border rounded mb-2" />
          <select name="Building" value={formData.Flat.Building} onChange={handleChange} className="w-full p-2 border rounded mb-2">
            <option value="">Select Building</option>
            {dropdownData.buildings.map((bld) => (
              <option key={bld._id} value={bld._id}>{bld.Name}</option>
            ))}
          </select>
        </>
      )}

      {step === 5 && (
        <>
          <input type="text" name="Owner_Name" value={formData.Owner.Owner_Name} onChange={handleChange} placeholder="Owner Name" className="w-full p-2 border rounded mb-2" />
          <input type="text" name="Contact_Number" value={formData.Owner.Contact_Number} onChange={handleChange} placeholder="Contact Number" className="w-full p-2 border rounded mb-2" />
        </>
      )}

      <div className="flex justify-between">
        {step > 1 && <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => setStep(step - 1)}>Previous</button>}
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>{step < 5 ? "Next" : "Submit"}</button>
      </div>
    </div>
  );
};

export default MultiStepForm;
