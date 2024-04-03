import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   const handleLogin = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const q = query(collection(db, "admin"), where("email", "==", email));

  //       const querySnapshot = await getDocs(q);

  //       if (querySnapshot.empty) {
  //         toast.error("Invalid email or password");
  //         return;
  //       }

  //       querySnapshot.forEach((doc) => {
  //         if (doc.data().password === password) {
  //           navigate("/admin");
  //         } else {
  //           toast.error("Invalid email or password");
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Error signing in: ", error);
  //       toast.error("Error signing in");
  //     }
  //   };
  const handleSignInDb = async (e) => {
    e.preventDefault();

    const obj = {
      email: email,
      password: password,
    };

    let res = await fetch("http://localhost:8000/login", {
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
      alert(res.message);
    }
  };

  // Random positions for circles
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
      <div className="relative h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* Random Circles */}
        {circleStyles.map((style, index) => (
          <div
            key={index}
            className={`absolute w-[100px] h-[100px] bg-${style.backgroundColor}-00 rounded-full`}
            style={{ ...style, transform: "translate(-50%, -50%)" }}
          ></div>
        ))}

        {/* Form Card */}
        <div className="relative z-10 bg-white p-8 rounded-lg  shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px]">
          <div className="text-center mb-8">
            <div className="text-2xl text-indigo-800 tracking-wide font-semibold">
              Sign In to Your Admin Account
            </div>
            <p className="text-gray-500 mt-3">Sign in to proceed.</p>
          </div>
          <form onSubmit={handleSignInDb} method="POST">
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide mb-2">
                Email Address
              </div>
              <input
                className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <div className="text-sm text-gray-600 text-center mt-3">
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

export default SignIn;
