import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:9000/api/v1"; // Change this based on your backend URL

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    Address: { address: "" },
    Building: { name: "" },
    Wing: { wingName: "" },
    Flat: { flatNumber: "" },
    Owner: { ownerName: "" },
  });

  const [existingData, setExistingData] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch existing data on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE}/get-all-address`) // Fetching address as example, adjust as needed
      .then((res) => {
        if (res.data.length > 0) {
          setExistingData(res.data[0]); // Assuming first record
          setFormData({
            Address: res.data[0] || { address: "" },
            Building: { name: "" },
            Wing: { wingName: "" },
            Flat: { flatNumber: "" },
            Owner: { ownerName: "" },
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const updatedStep = getCurrentStepKey();
    setFormData({
      ...formData,
      [updatedStep]: { ...formData[updatedStep], [e.target.name]: e.target.value },
    });
  };

  // Get the key of the current step
  const getCurrentStepKey = () => {
    switch (step) {
      case 1:
        return "Address";
      case 2:
        return "Building";
      case 3:
        return "Wing";
      case 4:
        return "Flat";
      case 5:
        return "Owner";
      default:
        return "";
    }
  };

  // Handle form submission (POST)
  const handleSubmit = async () => {
    setLoading(true);
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

      await axios.post(`${API_BASE}${apiEndpoint}`, formData[getCurrentStepKey()]);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder={`Enter ${getCurrentStepKey()}...`}
          name={Object.keys(formData[getCurrentStepKey()])[0]} // Get the input field name dynamically
          value={formData[getCurrentStepKey()][Object.keys(formData[getCurrentStepKey()])[0]] || ""}
          onChange={handleChange}
        />
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setStep(step - 1)}
          >
            Previous
          </button>
        )}

        {step < 5 ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
