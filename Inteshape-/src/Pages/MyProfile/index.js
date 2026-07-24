import { useState } from "react";
import { useNavigate } from "react-router-dom";






function MyProfile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const goToLogin = () => navigate("/");
    const goToProfile = () => navigate("/profile");
    const signOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <>
            <div className="main-wrapper">
                <div className="profile_section">
                    <div className="container">
                        <h1>My Profile</h1>
                    </div>
                </div>
                <div>
                    <button
                        className="login-signup-btn"
                        onClick={isLoggedIn ? goToProfile : goToLogin}
                    >
                        {isLoggedIn ? "Profile" : " Logout"}
                    </button>

                    {isLoggedIn && (
                        <button className="logout-btn" onClick={signOut}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default MyProfile