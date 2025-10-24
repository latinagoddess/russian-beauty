"use client";

import React, { useState, useEffect } from "react"; // Added useEffect
import styles from "@/styles/MailingPopup.module.scss";

import Modal from "@mui/material/Modal";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

function MailingPopup() {
  const [successModalOpen, setSuccessModalOpen] = useState(false); // Renamed for clarity
  const [popupOpen, setPopupOpen] = useState(false); // Start as false, open after delay

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Effect to open the popup after a delay (e.g., 3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only open if not already successfully subscribed in this session
      if (!sessionStorage.getItem('subscribedMailingPopup')) {
        setPopupOpen(true);
      }
    }, 3000); // 3 second delay, adjust as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []);


  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setSubmitMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setSubmitMessage("");

    try {
      const response = await fetch("https://russian-beauty.vercel.app/api/subscribe/", { // Your Vercel deployed API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message || "Successfully subscribed!");
        setEmail(""); // Clear email input
        setSuccessModalOpen(true); // Open the success modal
        sessionStorage.setItem('subscribedMailingPopup', 'true'); // Mark as subscribed for this session
      } else {
        const errorMsg = data?.error || data?.message || `Subscription failed (status: ${response.status}). Please try again.`;
        setSubmitMessage(errorMsg);
        console.error("API Error Data:", data);
      }
    } catch (error) {
      console.error("Subscription fetch error:", error);
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    setPopupOpen(false); // Close the main popup after success modal is closed
  };

  const handleCloseMainPopup = () => {
    setPopupOpen(false);
  };

  if (!popupOpen) return null; // Don't render if the main popup isn't open

  return (
    <section className={styles.mailingPopup}>
      {/* Success Modal */}
      <Modal
        open={successModalOpen}
        onClose={handleCloseSuccessModal}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <div className={styles.modal}> {/* Assuming this is your success modal style */}
          <div className={styles.image} />
          <div className={styles.content}>
            <FaRegCheckCircle size={50} color="green" style={{ marginBottom: '20px' }} />
            <h2>Successfully Subscribed!</h2>
            <p style={{ fontStyle: "italic" }}>
              {
                "You’ll now be kept up-to-date of my next touring date/schedule when I update it next! If it’s been a week and you haven’t gotten an email please check your spam, if not please re-type the email again to ensure you've entered the correct address."
              }
            </p>
          </div>
        </div>
      </Modal>

      {/* Main Mailing List Popup Content */}
      <IoIosClose className={styles.close} onClick={handleCloseMainPopup} />
      <h1>JOIN MY MAILING LIST</h1>
      <p>and never miss an update with my schedule, touring dates, and more</p>
      <section className={styles.form}>
        <input
          type="email"
          placeholder="Email Address"
          value={email} // Controlled component
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          aria-label="Email Address for mailing list"
        />
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </section>
      {/* Display submit messages (especially errors) directly in the popup */}
      {submitMessage && !successModalOpen && (
         <p style={{ 
            marginTop: '10px', 
            color: submitMessage.toLowerCase().includes('success') ? 'green' : 'red',
            textAlign: 'center', // Center the message
            fontSize: '0.9em'
         }}>
           {submitMessage}
         </p>
      )}
    </section>
  );
}

export default MailingPopup;