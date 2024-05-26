// pages/pneumoniaData.js
import React from "react";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const PneumoniaDataPage = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 p-8 flex flex-col items-center" style={{ minHeight: "100vh" }}>
        <h1 className="text-4xl font-bold mb-8 text-green-800">Pneumonia Detection Model Data</h1>
        <div className="max-w-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p><strong>Model Purpose:</strong> Accurate diagnosis of pneumonia using chest X-ray images and the VGG16 architecture.</p>
            <p><strong>Data Source:</strong> Labeled dataset of 5856 frontal chest X-ray images, classified as pneumonia or normal.</p>
            <p><strong>Model Architecture:</strong> VGG16 Convolutional Neural Network (CNN) model with thirteen convolutional layers and three fully connected layers.</p>
            <p><strong>Dataset Size:</strong> There are 5213 images used in the dataset.</p>
            <p><strong>Training Accuracy:</strong> The model achieved a training accuracy of 84%.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Model Implementation</h2>
            <p>The VGG16 CNN model is utilized for pneumonia detection. The model consists of thirteen convolutional layers and three fully connected layers. Convolutional layers extract complex features from input data, while pooling layers reduce spatial dimensionality. Fully connected layers handle the classification process.</p>
            <p>The model is trained on the labeled dataset and evaluated using performance metrics such as accuracy, precision, recall, and F1-score.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PneumoniaDataPage;
