"use client";

import React, { useState } from "react";
import styles from "@/styles/Touring.module.scss"; // Ensure this path is correct

import Modal from "@mui/material/Modal";
import { FaRegCheckCircle } from "react-icons/fa";

function Touring() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setSubmitMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setSubmitMessage("");

    try {
      //                                                                ADD TRAILING SLASH HERE 👇
      const response = await fetch("https://russian-beauty.vercel.app/api/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // ... rest of your handleSubmit function
      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message || "Successfully subscribed!");
        setEmail("");
        setModalOpen(true);
      } else {
        // Try to parse error from Vercel Functions or your API
        const errorMsg = data?.error || data?.message || `Subscription failed (status: ${response.status}). Please try again.`;
        setSubmitMessage(errorMsg);
        console.error("API Error Data:", data); // Log the full error data
      }
    } catch (error) {
      console.error("Subscription fetch error:", error);
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <main className={styles.touring}>
      <section className={styles.content}>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={styles.modal}>
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

        <h1>Schedule/Touring Dates</h1>
        <p>
          To be updated and notified with my schedule/touring dates subscribe to
          my newsletter below to get updates sent via email
        </p>
        <img src="/images/touring.jpg" alt="Touring promotional" />
        
        <section className={styles.form}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            aria-label="Email Address for newsletter"
          />
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>
        </section>
        {submitMessage && !modalOpen && (
          <p style={{ marginTop: '10px', color: submitMessage.toLowerCase().includes('success') ? 'green' : 'red' }}>
            {submitMessage}
          </p>
        )}
      </section>
    </main>
  );
}

export default Touring;