// pages/cataractDetection.js
import React from "react";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const CataractDetectionPage = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 p-8 flex flex-col items-center" style={{ minHeight: "100vh" }}>
        <h1 className="text-4xl font-bold mb-8 text-green-800">Cataract Detection Model Data</h1>
        <div className="max-w-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p><strong>Model Purpose:</strong> Classification of cataract disease using convolutional neural networks (CNNs).</p>
            <p><strong>Data Source:</strong> Cataract Eye Dataset providing direct eye images for image classification.</p>
            <p><strong>Model Architecture:</strong> DenseNet121 CNN architecture emerged as the forefront model for cataract disease detection.</p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Model Performance</h2>
            <ul>
              <li>Training Loss: 1.09%</li>
              <li>Training Accuracy: 99.54%</li>
              <li>Validation Loss: 6.22%</li>
              <li>Validation Accuracy: 98.17%</li>
              <li>Sensitivity: 96.55%</li>
              <li>Specificity: 100%</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Algorithm Overview</h2>
            <p>The model utilizes DenseNet121 architecture implemented using the TensorFlow object detection framework for cataract disease detection.</p>
            <p>The process involves training and validation stages, adjusting hyperparameters, and optimizing model learning.</p>
            <p>The dense block with 512 hidden layers and the "relu" activation function is crucial for model performance.</p>
            <p>The final layer incorporates a sigmoid activation function for output between 0 and 1.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CataractDetectionPage;
