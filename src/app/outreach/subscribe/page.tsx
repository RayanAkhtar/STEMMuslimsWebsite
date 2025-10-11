"use client";

import { useState } from "react";
import styles from "./subscribe.module.scss";
import Button from "../../../components/button";

export default function SubscribePage() {
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    schoolName: "",
    phoneNumber: "",
    interest: "", // Default selection for the choice
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
  });

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex =
      /^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/; // Basic regex for phone numbers
    return phoneRegex.test(phone);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "phoneNumber") {
      if (e.target.value && !validatePhoneNumber(e.target.value)) {
        setErrors({
          ...errors,
          phoneNumber: "Please enter a valid phone number.",
        });
      } else {
        setErrors({
          ...errors,
          phoneNumber: "",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      setErrors({
        ...errors,
        phoneNumber: "Please enter a valid phone number.",
      });
      return;
    }

    try {
      const response = await fetch("/api/outreach/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          status: "subscribed",
          merge_fields: {
            FIRST_NAME: formData.firstName,
            SCHOOL: formData.schoolName,
            PHONE: formData.phoneNumber,
            INTEREST: formData.interest,
          },
        }),
      });

      const result = await response.json();
      setMessage(result.message || "You have been successfully subscribed.");

      if (response.ok) {
        setFormData({
          email: "",
          firstName: "",
          schoolName: "",
          phoneNumber: "",
          interest: "",
        });
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <main>
      <div className={styles.pageIntroSubscribe}>
        <h1>Mailing List</h1>
      </div>
      <div className={styles.incentives}>
        By signing up you will be first to hear about our termly events such as:
        <ul>
          <li>Our Year 13 UCAS Mentorship program</li>
          <li>Our Year 12 STEM day</li>
          <li>Secondary School competitions</li>
          <li>And more!</li>
        </ul>
        <div className={styles.formContainer}>
          <form className={styles.subscribeForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Enter your email (required)"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
            />
            <input
              type="text"
              name="schoolName"
              placeholder="Enter your school name (required)"
              value={formData.schoolName}
              onChange={handleChange}
              className={styles.formInput}
            />
            <input
              type="text"
              name="firstName"
              placeholder="Enter your name (optional)"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.formInput}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number (optional)"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={styles.formInput}
            />
            {errors.phoneNumber && (
              <p className={styles.errorMessage}>{errors.phoneNumber}</p>
            )}
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className={styles.formInput}
            >
              <option value="Primary School">Primary School</option>
              <option value="Secondary School and Sixth Form">
                Secondary School and Sixth Form
              </option>
              <option value="Primary, Secondary, and Sixth Form">
                Primary, Secondary, and Sixth Form
              </option>
            </select>

            <div className={styles.formButton}>
              <Button
                label="Subscribe"
                // onClick={alternative_function}
                width="clamp(200px, 20vw, 400px)"
              />
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </main>
  );
}

const alternative_function = () => {
  console.log("Dummy function called!");
};
