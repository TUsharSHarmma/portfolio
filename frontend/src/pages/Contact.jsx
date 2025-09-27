import React, { useState } from 'react';
import { FaEnvelope, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false); // 🔄 loading state

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setIsSending(true);
      try {
        const res = await fetch('https://portfolio-9c32.onrender.com/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success) {
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
        }
      } catch (err) {
        console.error('Error sending contact:', err);
      } finally {
        setIsSending(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">📩 Contact Me</h2>
      <div className="contact-wrapper">
        <div className="contact-container">
          
          {/* Left: Social Cards */}
          <div className="contact-left-enhanced">
            <div className="social-card email-card">
              <div className="social-info">
                <FaEnvelope className="social-logo" />
                <div>
                  <h4>Email</h4>
                  <p>tusharsharmaprayagraj@gmail.com</p>
                </div>
              </div>
              <a href="mailto:tusharsharmaprayagraj@gmail.com" className="social-btn red">
                Message <FaEnvelope />
              </a>
            </div>

            <div className="social-card linkedin-card">
              <div className="social-info">
                <FaLinkedin className="social-logo" />
                <div>
                  <h4>LinkedIn</h4>
                  <p>Tushar Sharma</p>
                </div>
              </div>
              <a href="https://linkedin.com/in/tusharsharma18-cse" target="_blank" rel="noreferrer" className="social-btn blue">
                Message <FaLinkedin />
              </a>
            </div>

            <div className="social-card whatsapp-card">
              <div className="social-info">
                <FaWhatsapp className="social-logo" />
                <div>
                  <h4>WhatsApp</h4>
                  <p>+91 9026333543</p>
                </div>
              </div>
              <a href="https://wa.me/919026333543" target="_blank" rel="noreferrer" className="social-btn green">
                Message <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <p className="error-msg">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-msg">{errors.email}</p>}

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'input-error' : ''}
            />
            {errors.message && <p className="error-msg">{errors.message}</p>}

            <button type="submit" className="btn" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Message'}
            </button>

            {submitted && <p className="success-msg">Thanks! I’ll get back to you soon. 😊</p>}
          </form>

        </div>
      </div>
    </section>
  );
}

export default Contact;
