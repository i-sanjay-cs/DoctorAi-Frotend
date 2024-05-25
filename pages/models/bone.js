import React, { useState, useEffect } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '4bvLxFQCnCd8dyzwsxRnhu4QUnnsq1EMn5F6dauI', // Replace <<apiKey>> with your actual CoHere API key
});

const BoneFracture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputBoneType, setOutputBoneType] = useState("");
  const [outputResult, setOutputResult] = useState("");
  const [outputStyle, setOutputStyle] = useState({});
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [generatedText, setGeneratedText] = useState("Wait for generating the response");
  const [generatedTextStyle, setGeneratedTextStyle] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://6a2a-34-122-19-16.ngrok-free.app/predict-fracture", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setOutputBoneType(result.predicted_body_part);
      setOutputResult(result.predicted_fracture_status);

      setOutputStyle({
        color: result.predicted_fracture_status === "fractured" ? "Red" : "Green",
      });

      setGeneratedTextStyle({
        color: "black",
      });

      if (result.predicted_fracture_status !== "normal") {
        const generateResponse = await cohere.generate({
          prompt: `Start with : Hello, I am MediMate. ${result.predicted_body_part}, Result: ${result.predicted_fracture_status} what are the next steps typically taken?`,
        });

        const { text } = generateResponse.generations[0];
        setGeneratedText(text || "No remedy generated for this prediction.");
      } else {
        setGeneratedText("It's good. You are fine!");
      }
    } catch (error) {
      console.error("Error detecting fracture:", error);
      if (error.response && error.response.data && error.response.data.error) {
        // Use the error message from the API response
        setOutputBoneType("Error");
        setOutputResult(error.response.data.error);
      } else {
        // Use a generic error message
        setOutputBoneType("Error");
        setOutputResult("Uploaded image is not a valid bone image");
      }
      setOutputStyle({
        color: "Red",
      });
      setGeneratedText("Wait for generating the response");
      setGeneratedTextStyle({
        color: "Red",
      });
    }
    
    
  };

  useEffect(() => {
    console.log("Generated Text:", generatedText);
  }, [generatedText]);

  return (
    <>
      <Header />
      <div className="bg-gray-100 p-8 pt-24 flex flex-col items-center" style={{ minHeight: "100vh" }}>
        <h1 className="text-4xl font-bold mb-4 text-green-800">Bone Fracture Detection</h1>
        
        <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "600px" }} className="p-8 mb-8 rounded-md shadow-md flex flex-col md:flex-row items-center">
          <div className="mr-4 md:mr-8 mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold mb-2 md:mb-4">Upload Image</h2>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="block bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer mb-2 md:mb-0">
              Choose File
            </label>
          </div>
          
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md" style={{ paddingTop: '10px', marginTop: '50px' }} onClick={handleUpload}>
            Detect Fracture
          </button>
        </div>
        
        {uploadedImageUrl && (
          <div className="mb-8">
            <img src={uploadedImageUrl} alt="Uploaded" className="max-h-64 max-w-full" />
          </div>
        )}
        
        <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "600px" }} className="p-8 mb-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <p>
            <strong>Bone Type:</strong> <span style={{ color: "black" }}>{outputBoneType}</span> <br />
            <strong>Condition:</strong> <span style={outputStyle}>{outputResult}</span>
          </p>
        </div>
        
        <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "600px", maxHeight: "200px", overflowY: "auto" }} className="p-8 mb-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Response from MediMate</h2>
          <div style={{ fontSize: "14px", ...generatedTextStyle }}>{generatedText}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BoneFracture;
