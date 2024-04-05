import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   const handleLogin = async (e) => {
  //     e.preventDefault();
  //     const auth = getAuth();

  //     try {
  //       // Sign in with email and password
  //       const userCredential = await signInWithEmailAndPassword(auth, email, password);

  //       // Check if the user is an admin
  //       if (userCredential) {
  //         navigate('/home');
  //       } else {
  //         // Handle login for other user types (students, etc.)
  //       }
  //     } catch (error) {
  //       navigate('/Error');
  //     }
  //   };
  const handleSignUpDb = async (e) => {
    e.preventDefault();

    const obj = {
      email: email,
      password: password,
      isAdmin: false,
    };

    let res = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json",
      },
    });
    res = await res.json();
    sessionStorage.setItem("token", res.token);
    if (res.success) {
      toast.success(res.message, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/home");
        window.location.reload();
      }, 1000);
    } else {
      toast.error(res.message, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const circleStyles = [
    { top: "10%", left: "15%", backgroundColor: "indigo" },

    {
      top: "100%",
      left: "80%",
      backgroundColor: "blue",
      transform: "translate(-50%, -100%)",
    },
  ];

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <Navbar />
      <div className="relative h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* Random Circles */}
        {circleStyles.map((style, index) => (
          <div
            key={index}
            className={`absolute w-[100px] h-[100px] bg-${style.backgroundColor}-500 rounded-full`}
            style={{ ...style, transform: "translate(-50%, -50%)" }}
          ></div>
        ))}

        {/* Form Card */}
        <div className="relative z-10 bg-white p-8 rounded-lg  shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px]">
          <div className="text-center mb-8">
            <div className="text-2xl text-indigo-800 tracking-wide font-semibold">
              Login to your User Account
            </div>
            <p className="text-gray-500 mt-3">Log Into Your user Account.</p>
          </div>
          <form onSubmit={handleSignUpDb}>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide mb-2">
                Email Address
              </div>
              <input
                className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="user@chitkarauniversity.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide mb-2">
                  Password
                </div>
                <div>
                  <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-10">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="text-sm text-gray-600 text-center mt-8">
            Don't have an Account?
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
