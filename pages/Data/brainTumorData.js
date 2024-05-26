// pages/brainTumorData.js
import React from "react";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const BrainTumorDataPage = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 p-8 flex flex-col items-center" style={{ minHeight: "100vh" }}>
        <h1 className="text-4xl font-bold mb-8 text-green-800">Brain Tumor Detection Model Data</h1>
        <div className="max-w-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p><strong>Model Purpose:</strong> Detection of brain tumors automatically from MRI brain scans using the VGG 16 architecture and Convolutional Neural Networks (CNN).</p>
            <p><strong>Data Source:</strong> Brain MRI pictures categorized into two folders, "yes" and "no", each containing 1050 images. The "yes" folder contains 1050 tumorous MRI images, while the "no" folder contains 1050 non-tumorous MRI images.</p>
            <p><strong>Model Architecture:</strong> The algorithm utilizes the VGG 16 architecture and CNN for brain tumor detection. Convolutional feature maps are created using VGG 16, and brain tumors are identified and categorized using the Faster CNN method.</p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Dataset Overview</h2>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Number of Images</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tumorous (yes)</td>
                  <td>1050</td>
                </tr>
                <tr>
                  <td>Non-Tumorous (no)</td>
                  <td>1050</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Data Split</h2>
            <p><strong>Training:</strong> 70%</p>
            <p><strong>Validation:</strong> 15%</p>
            <p><strong>Testing:</strong> 15%</p>
          </div>

 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BrainTumorDataPage;
