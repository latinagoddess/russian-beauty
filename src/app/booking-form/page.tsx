"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/BookingForm.module.scss";

import Link from "next/link";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { FaRegCheckCircle } from "react-icons/fa";

import Modal from "@mui/material/Modal";

import ReCAPTCHA from "react-google-recaptcha";

function Booking() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [number, setNumber] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [callType, setCallType] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [rate, setRate] = useState<string | null>(null);

  const [checked, setChecked] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  // CHANGE: Added state to track form submission (loading state)
  const [isSending, setIsSending] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => setModalOpen(false);

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  useEffect(() => {
    if (
      name &&
      email &&
      number &&
      age &&
      callType &&
      city &&
      date &&
      rate &&
      checked
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [name, email, number, age, callType, city, date, rate, checked]);

  const submit = async (e: any) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSending) return;

    // CHANGE: Set loading state to true
    setIsSending(true);

    const data = {
      name,
      email,
      number,
      age,
      callType,
      city,
      date,
      rate,
    };
    try {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        const token = await recaptchaRef.current.executeAsync();

        if (token) {
          const res = await fetch(
            "https://russian-beauty.vercel.app/api/send-email/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          if (!res.ok) {
            // Handle server errors
            throw new Error(`API call failed with status: ${res.status}`);
          }
          
          const resData = await res.json();
          setModalOpen(true);
        }
      }
    } catch (error) {
      console.log("error in submit ", error);
      // Optional: show an error message to the user
      alert("There was an error submitting your form. Please try again.");
    } finally {
      // CHANGE: Set loading state to false after API call is complete (success or fail)
      setIsSending(false);
    }
  };

  const onChange = () => {
    // on captcha change
  };

  const asyncScriptOnLoad = () => {
    console.log("Google recaptcha loaded just fine");
  };

  return (
    <main className={styles.booking}>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.successModal}>
          <div className={styles.image} />
          <div className={styles.content}>
            <h2>Form Submitted!</h2>
            <p style={{ fontStyle: "italic" }}>
              {
                "Thank you for submitting the form. I’ll reach back to you as soon as possible."
              }
            </p>
          </div>
        </div>
      </Modal>
      <h1>Form</h1>
      <p>
        Please fill this form out and {"I’ll"} reach back to you or feel free to
        contact me straight away, my number and email is under the{" "}
        <Link href="/contact">Contact Me</Link> section
      </p>
      <form>
        <section className={styles.rowInput}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>
        <section className={styles.rowInput}>
          <input
            type="tel"
            placeholder="Number"
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </section>
        <section className={styles.rowInput}>
          <input
            type="text"
            placeholder="Incall or Outcall"
            onChange={(e) => setCallType(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
        </section>
        <section className={styles.rowInput}>
          <input
            type="text"
            placeholder="Desired Date & Time"
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Rate Wanted (Duration)"
            onChange={(e) => setRate(e.target.value)}
          />
        </section>
        <FormControlLabel
          required
          control={<Checkbox />}
          onChange={(e: any) => setChecked(e.target.checked)}
          label="Have you read the Booking Procedure? If not please read to schedule an appointment"
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          onChange={onChange}
          asyncScriptOnLoad={asyncScriptOnLoad}
        />
        {/* CHANGE: Updated button to show loading state and text */}
        <button
          className={canSubmit && !isSending ? styles.active : styles.inactive}
          disabled={!canSubmit || isSending}
          onClick={submit}
        >
          {isSending ? "Sending..." : "Submit"}
        </button>
      </form>
    </main>
  );
}

export default Booking;