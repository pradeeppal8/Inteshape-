import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Contact from "./Pages/Contact";
import Blog from "./Pages/Blog";
import Projects from "./Pages/Projects";
import MyProfile from "./Pages/MyProfile";
import Portfolio from "./Pages/Portfolio";

// import ProtectedRoute from "./ProtectedRoute";
import "./scss/style.scss";
import "bootstrap/dist/css/bootstrap.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import { useTheme } from "./Component/ThemeProvider";
import BlogDetails from "./Pages/Blog/BlogDetails";
import Theme from "./Pages/Theme";
// import ColorSkin from "./Component/ColorSkin";

function App() {
  const { theme } = useTheme();
  const location = useLocation();
  const HIDE_LAYOUT_ON = ["/"];
  const hide = HIDE_LAYOUT_ON.includes(location.pathname);
  return (
    <div className={`App ${theme}`}>
      {!hide && <Header />}
      {/* <ColorSkin /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Contact />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/buytheme" element={<Theme />} />
        {/* <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/> */}
      </Routes>
      {!hide && <Footer />}
    </div>
  );
}

export default App;
