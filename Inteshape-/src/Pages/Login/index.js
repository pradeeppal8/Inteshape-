import { useState, } from "react";
// import CustomLoader from "../../Component/CustomeLoader";
import { useNavigate } from "react-router-dom";
import mainbanner1 from "../../ulits/assets/main-banner1.jpg";
import { Link } from 'react-router-dom';





function Login() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "pradeep@gmail.com") {
            navigate("/home");
        } else {
            alert("Invalid credentials");
        }
        const newErrors = {};
        if (!email.trim()) newErrors.email = 'Email is Required';

        setErrors(newErrors);
    };


    // useEffect(() => {
    //     const timer = setTimeout(() => setLoading(false), 1500);
    //     return () => clearTimeout(timer);
    // }, []);

    // if (loading) return <CustomLoader loading />;


    return (
        <div className="main-wrapper">
            <img src={mainbanner1} alt="" className="login-banner" />
            <div className="auth-container">
                <div className="login-container">

                    <div className="form-container">
                        <h2>Login Page</h2>
                        <p>
                            Don’t have an account? <Link to="/">Sign up now!</Link>
                        </p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
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
                        <button type="submit">
                            LET'S START <span>&rarr;</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>


    );
}

export default Login;