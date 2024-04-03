import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   onAuthStateChanged,
// } from "firebase/auth";

// import { auth } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [universityId, setUniversityId] = useState("");
  const navigate = useNavigate();

  // const handleSignUp = async (e) => {
  //     e.preventDefault();
  //     const validEmailDomain = email.endsWith('@chitkarauniversity.edu.in');
  //     if (!validEmailDomain) {
  //         alert('Please use a valid Chitkara University email address.');
  //         return;
  //     }

  //     try {
  //         // Create a new user with email and password
  //         const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  //         // Send email verification
  //         await sendEmailVerification(userCredential.user);

  //         // Wait for email verification to complete
  //         const unsubscribe = onAuthStateChanged(auth, (user) => {
  //             if (user && user.emailVerified) {
  //                 // Email is verified, navigate to the home page or any other desired route
  //                 navigate('/home');
  //             } else if (user && !user.emailVerified) {
  //                 // Email is not verified, prompt the user to check their email
  //                 alert('Please verify your email address. Check your inbox for the verification link and refresh after verifing email.');
  //             }
  //         });

  //         // Cleanup the subscription
  //         unsubscribe();
  //     } catch (error) {
  //         console.error('Error during signup:', error);
  //         // Handle signup failure, e.g., display an error message or redirect to an error page
  //         navigate('/Error');
  //     }
  // };
  // Add this useEffect to check email verification status
  // useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //             if (user.emailVerified) {
  //                 // Email is verified, navigate to the home page or any other desired route
  //                 navigate('/home');
  //             } else {
  //                 // Email is not verified, prompt the user to check their email
  //                 alert('Please verify your email address. Check your inbox for the verification link.');
  //             }
  //         }
  //     });

  //     // Cleanup the subscription
  //     return () => unsubscribe();
  // }, [auth, navigate]);

  const handleSignUpDb = async (e) => {
    e.preventDefault();

    const obj = {
      name: name,
      email: email,
      password: password,
      uid: parseInt(universityId),
    };

    let res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json",
      },
    });
    res = await res.json();
    if (res.success) {
      navigate("/home");
    } else {
      alert("User already exists...");
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
      <Navbar />
      <div className="relative h-screen flex items-center p-8 mt-8 justify-center bg-gray-100 overflow-hidden">
        {/* Render Circles */}
        {circleStyles.map((style, index) => (
          <div
            key={index}
            className={`absolute w-[100px] h-[100px] bg-${style.backgroundColor}-500 rounded-full`}
            style={{ ...style, transform: "translate(-50%, -50%)" }}
          ></div>
        ))}

        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <div className="text-center mb-8">
            <div className="text-2xl text-indigo-800 font-semibold">
              Sign Up for a New Account
            </div>
            <p className="text-gray-500 mt-3">
              Create an account to access additional features.
            </p>
          </div>
          <form onSubmit={handleSignUpDb} method="POST">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Use University Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="universityId"
                className="block text-sm font-bold text-gray-700"
              >
                University ID
              </label>
              <input
                id="universityId"
                name="universityId"
                type="text"
                className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="211*******"
                value={universityId}
                onChange={(e) => setUniversityId(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <button
                className="bg-indigo-500 text-gray-100 p-3 w-full rounded-md tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
              Log in here
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
