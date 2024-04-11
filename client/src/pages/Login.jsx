import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "universal-cookie";
import RingLoader from "react-spinners/RingLoader";
import context from "../contextApi/Contextstate";
function Login() {
  //   const data = useContext(context)
  //   const val = "hellos"
  //  data.addUserDetail(val)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  // const [userDetails,setUserDetails] = useState([])

  const handleSignUpDb = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const validateEmail = email.endsWith("@chitkarauniversity.edu.in");
      if (validateEmail) {
        // stores the user in session storage
        const user = await axios.post(`http://localhost:8000/getUserDetails`, {
          method: "POST",
          body: { email: email },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (user.data.success) {
          const userDetail = user.data.data;
          sessionStorage.setItem("email", userDetail.email);
          sessionStorage.setItem("name", userDetail.name);
          sessionStorage.setItem("uid", userDetail.uid);
        }

        const response = await axios.post(
          `http://localhost:8000/login`,
          { email, password },
          config
        );
        if (response.data.isAdmin === true) {
          cookies.set("token", response.data.token);
          cookies.set("isAdmin", response.data.isAdmin);
          if (response.data.success) {
            toast.success(response.data.message, {
              position: "top-left",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          setTimeout(() => {
            navigate("/admin");
            window.location.reload();
          }, 1000);
        } else {
          cookies.set("token", response.data.token);
          if (response.data.success) {
            toast.success(response.data.message, {
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
              // addUserDetail(["goof"]);
            }, 1000);
          } else {
            toast.error(response.data.message, {
              position: "top-left",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        }
      } else {
        toast.error("Please enter chitkara email id only.", {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setLoading(false);
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
        autoClose={1000}
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
      {loading && (
        <div className="w-full h-full absolute flex justify-center items-center z-50 bg-opacity-25 bg-slate-700">
          <RingLoader
            color={"blue"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
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
              Login to your Account
            </div>
            <p className="text-gray-500 mt-3">Log Into Your Account.</p>
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
