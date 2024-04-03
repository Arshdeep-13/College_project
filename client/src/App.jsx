import "./App.css";

import Admin from "./pages/Admin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Submitted from "./pages/Submitted";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Form from "./pages/Form";
import BlogPost from "./components/BlogPost";
import Questions from "./pages/Questions";
import InterviewForm from "./pages/InterviewForm";
import Error404 from "./pages/Error404";
import LandingPage from "./components/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const validate = sessionStorage.getItem("token");
    if (validate) {
      setIsAuth(validate);
    }
  }, []);

  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/formSubmitted" element={<Submitted />} />
        <Route path="/Login" element={isAuth == null ? <Login /> : <Home />} />
        <Route
          path="/sign-in"
          element={isAuth == null ? <SignIn /> : <Home />}
        />
        <Route path="/home" element={isAuth == null ? <Login /> : <Home />} />
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/form" element={<Form />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/post/:id" element={<BlogPost />} />
        {/* <Route path='/signin' element={<SignIn/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
