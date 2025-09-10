import { useState,  } from "react";
// import CustomLoader from "../../Component/CustomeLoader";
import { useNavigate } from "react-router-dom";
import mainbanner1 from "../../ulits/assets/main-banner1.jpg";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { loginUser } from "../../services/auth";





function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    // const location = useLocation();
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => setLoading(false), 1500);
    //     return () => clearTimeout(timer);
    // }, []);

    // if (loading) return <CustomLoader loading />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "pradeep@gmail.com" && password === "12345678") {
            navigate("/home");
        } else {
            alert("Invalid credentials");
        }
        const newErrors = {};
        if (!email.trim()) newErrors.email = 'Email is Required';
        if (!password.trim()) newErrors.password = 'Password is Required';
        setErrors(newErrors);
    };

    return (
        <div className="main-wrapper">
            <img src={mainbanner1} alt="" className="login-banner" />
            <div className="auth-container">
                <div className="login-container">
                    <div className="form-container">
                        <h2>Signup Page</h2>
                        <p>
                            Already have an account? <Link to="/login">Log in now!</Link>
                        </p>
                    </div>

                    <form className="login-form">
                        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                            <label>EMAIL ADDRESS</label>
                            <input
                                type="email"
                                placeholder="example@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                            <label>PASSWORD</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "35px",
                                    cursor: "pointer",
                                    // color: "#fff",
                                    transform: "translate(-50%, 80%)",
                                }}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>
                        <button type="submit" onClick={handleSubmit}>LOGIN</button>
                    </form>
                </div>
            </div>
        </div>


    );
}

export default Signup;