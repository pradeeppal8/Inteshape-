import React, { useState, useEffect, useRef } from "react";
import "../../scss/contact.scss";
import config from "../../config";

const ICONS = {
    info: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="12" />
            <text x="12" y="17" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="sans-serif">i</text>
        </svg>
    ),
    success: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="12" />
            <polyline points="6,12 10,16 18,8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    error: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="12" />
            <line x1="8" y1="8" x2="16" y2="16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="16" y1="8" x2="8" y2="16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    ),
    warning: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="12" />
            <text x="12" y="17" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold" fontFamily="sans-serif">!</text>
        </svg>
    ),
};

function Toast({ toasts, onClose }) {
    return (
        <div className="ct-toast-container">
            {toasts.map((t) => (
                <div key={t.id} className={`ct-toast ct-toast--${t.type}`}>
                    <span className={`ct-toast__icon ct-toast__icon--${t.type}`}>
                        {ICONS[t.type]}
                    </span>
                    <span className="ct-toast__msg">{t.message}</span>
                    <button className="ct-toast__close" onClick={() => onClose(t.id)}>✕</button>
                </div>
            ))}
        </div>
    );
}

function Contact() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [toasts, setToasts] = useState([]);
    const [contactInfo, setContactInfo] = useState({
        tag: "CONTACT US",
        heading: "Get in Touch",
        description: "Have a project in mind or just want to say hello? Fill in the form and we'll get back to you within 24 hours.",
        address: "123 Main Street, New York, NY 10001",
        phone: "+1 (555) 000-0000",
        email: "hello@inteshape.com",
    });
    const [contactImage, setContactImage] = useState("");
    const toastId = useRef(0);

    useEffect(() => {
        fetch(`${config.apiUrl}/api/settings`)
            .then((r) => r.json())
            .then((data) => {
                if (!data.success || !data.data?.contactDetails) return;

                const c = data.data.contactDetails;
                setContactInfo((prev) => ({
                    ...prev,
                    tag: c.addressLine1?.trim() || prev.tag,
                    heading: c.addressLine2?.trim() || prev.heading,
                    description: c.subjectOptions?.trim() || prev.description,
                    address: c.stateProvince?.trim() || prev.address,
                    phone: c.contactNumber?.trim() || prev.phone,
                    email: c.contactEmail?.trim() || prev.email,
                }));

                if (c.contactBanner && c.bannerEnabled !== false) {
                    setContactImage(c.contactBanner);
                } else {
                    setContactImage("");
                }
            })
            .catch(() => {
                // Keep static fallback values when backend is unavailable.
            });
    }, []);

    const showToast = (type, message) => {
        const id = ++toastId.current;
        setToasts((t) => [...t, { id, type, message }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
    };
    const closeToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

    const validate = () => {
        const errs = {};
        if (!form.firstName.trim()) errs.firstName = "First name is required";
        if (!form.lastName.trim()) errs.lastName = "Last name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errs.email = "Enter a valid email";
        if (!form.phone.trim()) errs.phone = "Phone number is required";
        else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone))
            errs.phone = "Enter a valid phone number";
        if (!form.message.trim()) errs.message = "Please enter your message";
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setErrors((ev) => ({ ...ev, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            showToast("error", "Please fix the highlighted errors.");
            return;
        }
        fetch("http://localhost:5000/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
                    setErrors({});
                    showToast("success", "Message sent! We'll get back to you soon.");
                } else {
                    showToast("error", "Failed to send message. Please try again.");
                }
            })
            .catch(() => showToast("error", "Network error. Please try again."));
    };

    const headingParts = contactInfo.heading.trim().split(/\s+/);
    const headingLead = headingParts.length > 1
        ? headingParts.slice(0, -1).join(" ")
        : contactInfo.heading;
    const headingAccent = headingParts.length > 1 ? headingParts[headingParts.length - 1] : "";

    return (
        <div className={`contact-page ${contactImage ? "has-image" : ""}`}>
            <Toast toasts={toasts} onClose={closeToast} />
            {contactImage && (
                <div className="contact-image-panel">
                    <img src={contactImage} alt="Contact" />
                </div>
            )}
            <div className="contact-wrapper">

                {/* Left info panel */}
                <div className="contact-info">
                    <div className="info-tag">{contactInfo.tag}</div>
                    <h1>
                        {headingLead}
                        {headingAccent ? <span>{` ${headingAccent}`}</span> : null}
                    </h1>
                    <p className="info-sub">
                        {contactInfo.description}
                    </p>

                    <div className="info-items">
                        <div className="info-item">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <strong>Address</strong>
                                <span>{contactInfo.address}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.41 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.38a16 16 0 0 0 5.61 5.61l.77-.77a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <div>
                                <strong>Phone</strong>
                                <span>{contactInfo.phone}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div>
                                <strong>Email</strong>
                                <span>{contactInfo.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right form panel */}
                <div className="contact-form-panel">
                    <div className="form-header">
                        <h2>Send a Message</h2>
                        <p>Nunc erat cursus tellus gravida.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-row">
                            <div className="form-group">
                                <label>FIRST NAME</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Please enter first name..."
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className={errors.firstName ? "err" : ""}
                                />
                                {errors.firstName && <span className="err-msg">{errors.firstName}</span>}
                            </div>
                            <div className="form-group">
                                <label>LAST NAME</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Please enter last name..."
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className={errors.lastName ? "err" : ""}
                                />
                                {errors.lastName && <span className="err-msg">{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>EMAIL</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Please enter email..."
                                    value={form.email}
                                    onChange={handleChange}
                                    className={errors.email ? "err" : ""}
                                />
                                {errors.email && <span className="err-msg">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label>PHONE NUMBER</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Please enter phone number..."
                                    value={form.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? "err" : ""}
                                />
                                {errors.phone && <span className="err-msg">{errors.phone}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>WHAT DO YOU HAVE IN MIND</label>
                            <textarea
                                name="message"
                                placeholder="Please enter query..."
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                className={errors.message ? "err" : ""}
                            />
                            {errors.message && <span className="err-msg">{errors.message}</span>}
                        </div>

                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Contact;