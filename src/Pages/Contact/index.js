import React, { useState, useEffect, useRef } from "react";
import user_img from "../../ulits/assets/user_img.png";
import { useNavigate } from "react-router-dom";



function Toast({ show, type = "success", message, onClose, duration = 5000 }) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);

    const startTimer = () => {
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(onClose, timeLeft);
    };

    const pauseTimer = () => {
        clearTimeout(timerRef.current);
        setTimeLeft((prev) => prev - (Date.now() - startTimeRef.current));
    };

    useEffect(() => {
        if (show) {
            setTimeLeft(duration);
            startTimer();
        }
        return () => clearTimeout(timerRef.current);
    }, [show, duration]);

    if (!show) return null;


    return (
        <div className={`toast ${type}`} onMouseEnter={pauseTimer}
            onMouseLeave={startTimer}>
            <span className="msg">{message}</span>
            <button className="close" onClick={onClose}>×</button>
            <div className="bar" style={{
                animation: `shrink ${duration}ms linear forwards`,
                animationPlayState: timeLeft === duration ? "running" : "paused"
            }} />
        </div>
    );
}

function Contact() {
    const navigate = useNavigate();
    const passwordRef = useRef(null);
    const [form, setForm] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [toast, setToast] = useState({ show: false, type: "success", message: "" });
    const showToast = (type, message) => setToast({ show: true, type, message });
    const hideToast = () => setToast(t => ({ ...t, show: false }));



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };
    const handleUsernameKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            passwordRef.current.focus(); // move to password field
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!form.username.trim()) newErrors.username = "Username is required";
        if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            showToast("error", "Please fix the highlighted errors");
            return;
        }

        // pretend API
        if (form.username === "pradeep@123" && form.password === "123456") {
            setTimeout(() => {
                setForm({ username: "", password: "" });
                setErrors({});
                showToast("success", "successful!");

                setTimeout(() => navigate("/home"), 3300);
            }, 500);
        } else {
            showToast("error", "Invalid username or password");
        }
    };
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setSuccess(), 5000);
            return () => clearTimeout(timer);
        }
    });
    return (
        <>
            <Toast
                show={toast.show}
                type={toast.type}
                message={toast.message}
                onClose={hideToast}
                duration={3000}
            />
            <div className="auth-wrap">
                {/* decorative blobs */}
                <div className="blob blob-a" />
                <div className="blob blob-b" />

                <div className="card">
                    <div className="card-head">
                        <div className="logo">
                            {/* replace with your SVG/PNG if you want */}
                            <span className="b">
                                <img src={user_img} alt="" />
                            </span>
                        </div>
                    </div>

                    <form className="card-body" onSubmit={handleSubmit}>
                        <h2 className="title">Welcome Back</h2>
                        <label className="field">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={form.username}
                                onChange={handleChange}
                                onKeyDown={handleUsernameKeyDown}
                            />
                            {errors.username && <p className="error">{errors.username}</p>}
                        </label>
                        <label className="field">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                ref={passwordRef}
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                        </label>

                        <button type="submit" className="btn-primary">Sign In</button>

                        {success && <p className="success">{success}</p>}

                        <p className="muted">
                            Already have an account? <a href="#login">Sign in here</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;