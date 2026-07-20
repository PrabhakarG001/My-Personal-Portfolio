import { useState } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { motion } from "framer-motion";
import "./Form.css";

const EMAILJS_SERVICE_ID =
  (import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID").trim();
const EMAILJS_TEMPLATE_ID =
  (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID").trim();
const EMAILJS_PUBLIC_KEY =
  (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY").trim();
const CONTACT_TO_EMAIL =
  (import.meta.env.VITE_CONTACT_TO_EMAIL || "your_email@gmail.com").trim();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Form = ({ delay = 0 }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (!trimmedData.name || !trimmedData.email || !trimmedData.subject || !trimmedData.message) {
      setStatus({ type: "error", message: "Please fill in all fields before sending." });
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    if (
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY ||
      EMAILJS_SERVICE_ID.startsWith("YOUR_") ||
      EMAILJS_TEMPLATE_ID.startsWith("YOUR_") ||
      EMAILJS_PUBLIC_KEY.startsWith("YOUR_")
    ) {
      setStatus({
        type: "error",
        message:
          "Set EmailJS keys in .env (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY) and restart the app.",
      });
      return;
    }

    if (!CONTACT_TO_EMAIL || CONTACT_TO_EMAIL === "your_email@gmail.com") {
      setStatus({
        type: "error",
        message:
          "Set destination inbox in .env (VITE_CONTACT_TO_EMAIL=your_email@gmail.com) and restart the app.",
      });
      return;
    }

    if (!EMAIL_PATTERN.test(CONTACT_TO_EMAIL)) {
      setStatus({
        type: "error",
        message:
          "VITE_CONTACT_TO_EMAIL is invalid. Please set a valid destination email and restart the app.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const ownerEmail = CONTACT_TO_EMAIL;
      const senderEmail = trimmedData.email;
      const messageBody = `Name: ${trimmedData.name}\nEmail: ${senderEmail}\nSubject: ${trimmedData.subject}\n\n${trimmedData.message}`;

      const templateParams = {
        // Recipient aliases (covers common EmailJS template variable names).
        to_email: ownerEmail,
        recipient_email: ownerEmail,
        destination_email: ownerEmail,
        contact_email: ownerEmail,
        to: ownerEmail,
        user_email: ownerEmail,
        email: ownerEmail,
        // Sender aliases (for template body and reply flow).
        from_name: trimmedData.name,
        sender_name: trimmedData.name,
        from_email: senderEmail,
        sender_email: senderEmail,
        visitor_email: senderEmail,
        reply_to: senderEmail,
        // Message aliases.
        subject: trimmedData.subject,
        title: trimmedData.subject,
        message: messageBody,
        comments: trimmedData.message,
        name: trimmedData.name,
        user_name: trimmedData.name,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus({ type: "success", message: "Message sent successfully." });
    } catch (error) {
      let message = "Failed to send message. Please try again in a moment.";
      const maybeStatus = error && typeof error === "object" ? error.status : undefined;

      if (error instanceof EmailJSResponseStatus || typeof maybeStatus === "number") {
        const statusCode = maybeStatus || error.status;
        if (statusCode === 403) {
          message =
            "EmailJS blocked this origin. Add your current site URL in EmailJS Security > Allowed Origins (include localhost for local testing).";
        } else if (statusCode === 422) {
          message =
            "EmailJS template/service mismatch. Verify your template variables and the selected Service ID + Template ID.";
        } else if (statusCode === 400) {
          message =
            "Invalid EmailJS request or credentials. Re-check public key, service ID, template ID, and template variable names.";
        } else if (statusCode === 429) {
          message = "Too many requests. Please wait a moment and try again.";
        } else {
          message = `EmailJS error (${statusCode}). Please verify your EmailJS configuration.`;
        }
      } else if (error instanceof Error && /network|fetch|failed/i.test(error.message)) {
        message = "Network issue detected. Check your connection and try again.";
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }

      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="universal-card contact-form-shell"
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <form className="contact-form" onSubmit={handleSubmit}>
        <p className="form-heading">Drop a Message</p>

        <motion.div
          className="form-field"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.42, delay: delay + 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <input
            required
            placeholder="Name"
            className="input-field"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </motion.div>

        <motion.div
          className="form-field"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.42, delay: delay + 0.13, ease: [0.22, 1, 0.36, 1] }}
        >
          <input
            required
            placeholder="Email"
            className="input-field"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </motion.div>

        <motion.div
          className="form-field"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.42, delay: delay + 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <input
            required
            placeholder="Subject"
            className="input-field"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </motion.div>

        <motion.div
          className="form-field"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.42, delay: delay + 0.23, ease: [0.22, 1, 0.36, 1] }}
        >
          <textarea
            required
            placeholder="Message"
            rows="4"
            className="input-field textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </motion.div>

        <motion.button
          type="submit"
          className="sendMessage-btn"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.44, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>

        <p
          aria-live="polite"
          style={{
            minHeight: "1.2rem",
            fontSize: "0.85rem",
            textAlign: "center",
            color: status.type === "success" ? "#64ffda" : "#ff8c8c",
          }}
        >
          {status.message}
        </p>
      </form>
    </motion.div>
  );
};

export default Form;
