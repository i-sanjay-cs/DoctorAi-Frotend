// pages/boneFractureData.js
import React from "react";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const BoneFractureDataPage = () => {
  // Define accuracy values for each bone part
  const elbowTrainingAccuracy = 89.00;
  const handTestAccuracy = 83.15;
  const shoulderValidationAccuracy = 82.56;

  // Define test accuracy values for each bone part
  const elbowTestAccuracy =79.33;
  const handValidationAccuracy = 76.30;
  const shoulderTestAccuracy = 74.20;

  return (
    <>
      <Header />
      <div className="bg-gray-100 p-8 flex flex-col items-center" style={{ minHeight: "100vh" }}>
        <h1 className="text-4xl font-bold mb-8 text-green-800">Bone Fracture Detection Model Data</h1>
        <div className="max-w-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p><strong>Model Purpose:</strong> Efficient and accurate identification of bone fractures using deep learning techniques, primarily centered on X-ray images.</p>
            <p><strong>Data Source:</strong> MURA dataset, consisting of 20,335 radiographs of the musculoskeletal system, categorized based on three distinct bone parts: the elbow, hand, and shoulder.</p>
            <p><strong>Features Used:</strong> X-ray images of the musculoskeletal system. Preprocessing includes operations like horizontal flipping and data augmentation for enhanced diversity.</p>
            <p><strong>Model Architecture:</strong> The algorithm utilizes a ResNet50 neural network to classify the bone type depicted in the image. Three distinct models are employed to recognize fractures in specific types of bones.</p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Dataset Overview</h2>
            <table>
              <thead>
                <tr>
                  <th>Part</th>
                  <th>Normal</th>
                  <th>Fractured</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Elbow</td>
                  <td>3160</td>
                  <td>2236</td>
                  <td>5396</td>
                </tr>
                <tr>
                  <td>Hand</td>
                  <td>4330</td>
                  <td>1673</td>
                  <td>6003</td>
                </tr>
                <tr>
                  <td>Shoulder</td>
                  <td>4496</td>
                  <td>4440</td>
                  <td>8936</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Model Performance</h2>
            <ul>
              <li>Elbow Training accuracy - {elbowTrainingAccuracy}%</li>
              <li>Hand Test accuracy - {handTestAccuracy}%</li>
              <li>Shoulder Validation accuracy - {shoulderValidationAccuracy}%</li>
              <li>Elbow Test accuracy - {elbowTestAccuracy}%</li>
              <li>Hand Validation accuracy - {handValidationAccuracy}%</li>
              <li>Shoulder Test accuracy - {shoulderTestAccuracy}%</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BoneFractureDataPage;
