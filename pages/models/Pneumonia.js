import React, { useState, useEffect } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '4bvLxFQCnCd8dyzwsxRnhu4QUnnsq1EMn5F6dauI', // Replace <<apiKey>> with your actual CoHere API key
});

const PneumoniaDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputCondition, setOutputCondition] = useState("");
  const [outputStyle, setOutputStyle] = useState({});
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [generatedText, setGeneratedText] = useState("Wait for generating the response");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please choose a file.");
      setOutputCondition("");
      setOutputStyle({ color: "red" });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://8dcd-34-122-19-16.ngrok-free.app/predict-pneumonia", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        setOutputCondition(result.error);
        setOutputStyle({ color: "red" });
        return;
      }

      setErrorMessage("");
      setOutputCondition(result.predicted_class_name);
      setOutputStyle({ color: result.predicted_class_name === "NORMAL" ? "green" : "red" });

      const generateResponse = await cohere.generate({
        prompt: `Start with: Hello, I am MediMate. Here the predicted condition for the Penumonia is  ${result.predicted_class_name} What are the next steps typically taken here  ? or if its NORMAL then just say something like to an Its good to here or similar to these as well as like add for extra things consult doctor`,
      });

      const { text } = generateResponse.generations[0];
      setGeneratedText(text || "No advice generated for this condition.");
    } catch (error) {
      console.error("Error detecting pneumonia:", error);
      setOutputCondition("Error");
      setOutputStyle({ color: "red" });
      setErrorMessage("Error detecting pneumonia. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Generated Text:", generatedText);
  }, [generatedText]);

  return (
    <>
      <Header />
      <div className="bg-gray-100 p-8 pt-24 flex flex-col items-center" style={{ minHeight: "100vh" }}>
        <h1 className="text-4xl font-bold mb-4 text-green-800">Pneumonia Detection</h1>
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
            Detect Pneumonia
          </button>
        </div>
        {uploadedImageUrl && (
          <div className="mb-8">
            <img src={uploadedImageUrl} alt="Uploaded" className="max-h-64 max-w-full" />
          </div>
        )}
        <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "600px", height: "200px" }} className="p-8 mb-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <p>
            <strong>Condition:</strong> <span style={outputStyle}>{outputCondition}</span>
          </p>
          {errorMessage && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}
        </div>
        <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "600px", maxHeight: "200px", overflowY: "auto" }} className="p-8 mb-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Response from MediMate</h2>
          <div style={{ fontSize: "14px" }}>{generatedText}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PneumoniaDetection;
