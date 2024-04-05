import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const ContactPage = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 p-8 flex flex-col items-center" style={{ minHeight: "100vh" }}>
        <h1 className="text-4xl font-bold mb-8 text-green-800">Contact Page</h1>
        <div className="contact-container" style={{ maxWidth: "90%", margin: "0 auto" }}>
          <h2 className="text-2xl font-bold mb-4">Contact Our Team Members</h2>
          <div className="team-member bg-white p-4 rounded-lg shadow-md" style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Nirmal Avhad</h3>
            <p style={{ fontSize: "18px" }}>Email: avhadnirmal072@gmail.com</p>
          </div>
          <div className="team-member bg-white p-4 rounded-lg shadow-md" style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Anup Muttha</h3>
            <p style={{ fontSize: "18px" }}>Email: anupmuttha666@gmail.com</p>
          </div>
          <div className="team-member bg-white p-4 rounded-lg shadow-md" style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Arshdeep Singh Mathadu</h3>
            <p style={{ fontSize: "14px" }}>Email: arshdeepsinghmathadu707@gmail.com</p> {/* Reduced font size */}
          </div>
          <div className="team-member bg-white p-4 rounded-lg shadow-md" style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Sanjay Prajapati</h3>
            <p style={{ fontSize: "18px" }}>Email: sanjayprajapati82@proton.me</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
