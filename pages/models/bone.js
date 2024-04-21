import React, { useState, useEffect } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '4bvLxFQCnCd8dyzwsxRnhu4QUnnsq1EMn5F6dauI', // Replace <<apiKey>> with your actual CoHere API key
});

const BoneFracture = () => {
  // State variables
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputBoneType, setOutputBoneType] = useState("");
  const [outputResult, setOutputResult] = useState("");
  const [outputStyle, setOutputStyle] = useState({});
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [generatedText, setGeneratedText] = useState("Wait for generating the response"); // Initial state

  // Function to handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Display the uploaded image
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
  };

  // Function to handle file upload and text generation
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://6943-34-133-233-220.ngrok-free.app/predict-bone", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setOutputBoneType(result.bone_type);
      setOutputResult(result.result);

      // Apply styles based on the result
      setOutputStyle({
        color: result.result === "Fractured" ? "Red" : "Green",
      });

      // Generate text using CoHere based on the result
      if (result.result !== "Normal") {
        const generateResponse = await cohere.generate({
          prompt: ` Start with : Hello, I am MediMate. ${result.bone_type}, Result: ${result.result} what are the next steps typically taken?`,
        });

        // Extract the generated text from the CoHere response
        const { text } = generateResponse.generations[0];

        // Set the generated text or a message if no text is generated
        setGeneratedText(text || "No remedy generated for this prediction.");
      } else {
        // Set a response indicating everything is fine
        setGeneratedText("It's good. You are fine!");
      }
    } catch (error) {
      console.error("Error detecting fracture:", error);
      setOutputBoneType("Error");
      setOutputResult("Error detecting fracture. Please try again.");
      setOutputStyle({
        color: "black",
      });
    }
  };

  // Effect to log generatedText when it changes
  useEffect(() => {
    console.log("Generated Text:", generatedText);
  }, [generatedText]);

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="bg-gray-100 p-8 pt-24 flex flex-col items-center" style={{ minHeight: "100vh" }}>
        <h1 className="text-4xl font-bold mb-4 text-green-800">Bone Fracture Detection</h1>
        
        {/* Upload Image Section */}
        <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "600px" }} className="p-8 mb-8 rounded-md shadow-md flex flex-col md:flex-row items-center">
          {/* File input */}
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
          
          {/* Upload button */}
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md" style={{ paddingTop: '10px', marginTop: '50px' }} onClick={handleUpload}>
  Detect Fracture
</button>

        </div>
        
        {/* Display uploaded image */}
        {uploadedImageUrl && (
          <div className="mb-8">
            <img src={uploadedImageUrl} alt="Uploaded" className="max-h-64 max-w-full" />
          </div>
        )}
        
        {/* Output Section */}
        <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "600px" }} className="p-8 mb-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <p>
            <strong>Bone Type:</strong> <span style={{ color: "black" }}>{outputBoneType}</span> <br />
            <strong>Condition:</strong> <span style={outputStyle}>{outputResult}</span>
          </p>
        </div>
        
        {/* Generated Text Section */}
        <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "600px", maxHeight: "200px", overflowY: "auto" }} className="p-8 mb-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Response from MediMate</h2>
          <div style={{ fontSize: "14px" }}>{generatedText}</div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default BoneFracture;
