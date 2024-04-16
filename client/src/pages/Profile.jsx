import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../components/AdminNavbar";
import image from "../assets/image.png";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";


const Profile = ({ isAuth, isAdmin }) => {
  const [name, setName] = useState("");
  const mainRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const expref = useState(null)
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [editname, setEditName] = useState(name);
  const [sessionEmail, setSessionEmail] = useState("");
  const editImageRef = useRef();
  const imageRef = useRef();
  const [ProfileImage, setProfileImage] = useState("");
  const [exp,setExp] = useState([])
const fetchExp = async() =>{
  const email = sessionStorage.getItem("email");
  try {
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }
    const res = await axios.post("http://localhost:8000/get-exp",{email},config);
    console.log(res.data.data)
    setExp(res.data.data)
  } catch (error) {
    console.log("Error from " + error)
  }
}
  useEffect(() => {
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    name == undefined || null ? "" : setName(name);
    email == undefined || null ? "" : setSessionEmail(name), setEmail(email);
    setName(name);
    setSessionEmail(email);
    fetchExp()
    mainRef.current.style.display = "block";
    emailRef.current.style.display = "none";
    passRef.current.style.display = "none";
    editImageRef.current.style.display = "none";
    expref.current.style.display = "none"

    const setImage = async () => {
      let user = await axios.post(
        `${import.meta.env.VITE_SERVER}/getUserDetails`,
        {
          method: "POST",
          body: { email: email },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (user.data.success) {
        const imagePath = user.data.data.image;
        if (imagePath) {
          let imageUrl = await fetch(
            `${import.meta.env.VITE_SERVER}/send-profile-image/${imagePath}`
          );
          imageUrl = await imageUrl.json();

          imageRef.current.src = "data:image/jpg;base64," + imageUrl.imagePath;
          setProfileImage("data:image/jpg;base64," + imageUrl.imagePath);
        }
      }
    };
    setImage();
  }, []);

  const editProfile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", email);

      let res = await fetch(`${import.meta.env.VITE_SERVER}/profile-image`, {
        method: "POST",
        body: formData,
      });
      res = await res.json();
      if (res) {
        const imagePath = res.imagePath;
        let imageUrl = await fetch(
          `${import.meta.env.VITE_SERVER}/send-profile-image/${imagePath}`
        );
        imageUrl = await imageUrl.json();

        imageRef.current.src = "data:image/jpg;base64," + imageUrl.imagePath;
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
        document.getElementById("editModal").close();
      } else {
        toast.error(res.message, {
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
    };
    input.click();
  };
  const handleEditClick = () => {
    setEditMode(true);
    document.getElementById("editModal").showModal();
  };
  const handleCloseModal = () => {
    document.getElementById("editModal").close();
  };
  const handleSaveEdit = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER}/edit-name`,
      { editname, sessionEmail },
      config
    );
    if (res.data.success) {
      setName(editname);
      sessionStorage.setItem("name", editname);
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
      document.getElementById("editModal").close();
    } else {
      toast.error(res.message, {
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
  };
  const handleNewPass = async () => {
    let res = await fetch(
      `${import.meta.env.VITE_SERVER}/changePassword-afterlogin`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: newPass,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    res = await res.json();
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
    } else {
      toast.error(res.message, {
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
    expref.current.style.display = "none"
    mainRef.current.style.display = "block";
    emailRef.current.style.display = "none";
    passRef.current.style.display = "none";
  };
  const handleForgetPass = async () => {
    expref.current.style.display = "none"
    mainRef.current.style.display = "none";
    emailRef.current.style.display = "block";
    passRef.current.style.display = "none";

    if (email != "") {
      checkUserExist();
    }
  };
  const emailRefBack = async () => {
    expref.current.style.display = "none"
    mainRef.current.style.display = "block";
    emailRef.current.style.display = "none";
    passRef.current.style.display = "none";
  };
  const checkUserExist = async () => {
    let res = await fetch(`${import.meta.env.VITE_SERVER}/check-email`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    res = await res.json();
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
      expref.current.style.display = "none"
      mainRef.current.style.display = "none";
      emailRef.current.style.display = "none";
      passRef.current.style.display = "block";
    } else {
      toast.error(res.message, {
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
  };

  const showExp = () =>{
    expref.current.style.display = "block"
  }

  return (
    <div>
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
      {isAuth && isAdmin ? <AdminNavbar /> : <Navbar />}

      <div className="container mx-auto my-60" ref={mainRef}>
        <div>
          <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
            <div className="relative flex justify-center">
              <img
                ref={imageRef}
                onMouseEnter={() => {
                  editImageRef.current.style.display = "block";
                }}
                onMouseLeave={() => {
                  editImageRef.current.style.display = "none";
                }}
                onClick={() => editProfile()}
                src={ProfileImage == "" ? image : ProfileImage}
                alt="Profile Picture"
                className="rounded-full mx-auto w-32 h-32 shadow-md border-4 border-white transition duration-200  transform hover:scale-110 text-center"
              />
              <div
                className="absolute bottom-10 text-5xl"
                ref={editImageRef}
                onClick={() => editProfile()}
                onMouseEnter={() => {
                  editImageRef.current.style.display = "block";
                }}
                onMouseLeave={() => {
                  editImageRef.current.style.display = "none";
                }}
              >
                <CiEdit />
              </div>
            </div>

            <div className="mt-16">
              <h1 className="font-bold text-center text-3xl text-gray-900">
                Username : {name}
              </h1>
              <p>
                <span></span>
              </p>
              <div className="my-5 px-6">
                <span className="text-xl font-semibold text-gray-200 block rounded-lg text-center leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">
                  Features
                </span>
              </div>
              <div className="w-full">
                <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                  <a
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150 text-lg md:text-base"
                    onClick={() => handleEditClick()}
                  >
                    <img
                      src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                      alt=""
                      className="rounded-full h-6 shadow-md inline-block mr-2"
                    />
                    Edit name
                  </a>
                  <a
                    href="#"
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150 text-lg md:text-base"
                    onClick={() => handleForgetPass()}
                  >
                    <img
                      src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                      alt=""
                      className="rounded-full h-6 shadow-md inline-block mr-2"
                    />
                    Reset Password
                  </a>
                  <button
                    href="#"
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150 text-lg md:text-base text-start"
                    onClick={editProfile}
                  >
                    <img
                      src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                      alt=""
                      className="rounded-full h-6 shadow-md inline-block mr-2"
                    />
                    Edit Profile Picture
                  </button>
                  <button
                    href="#"
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150 text-lg md:text-base text-start"
                    onClick={showExp}
                  >
                    <img
                      src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                      alt=""
                      className="rounded-full h-6 shadow-md inline-block mr-2"
                    />
                    Show All Experience
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={expref}
        className="relative z-10 bg-white p-8 rounded-lg shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px] mx-auto mt-20"
      >
        <div className="font-bold flex mb-7">
         
        {exp.length > 0 ? (
        exp.map(
          (post) =>
              <div className="py-3 " key={post._id}>
               Status: {post.isApproved ? "Approved" : "Not Approved"}
                <Link to={`/post/${post._id}`}>
                  <div className="max-w-[85%] mx-auto bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow mt-8 p-2 shadow">
                    {/* Title block */}
                    <div className="flex items-center justify-between">
                      <div className="p-4 flex items-center ">
                        <div className="w-10 h-10 rounded overflow-hidden flex items-center justify-centern">
                          <img
                            className="max-w-full max-h-full object-cover"
                            // src={getCompanyLogo(post.company)}
                            alt="Company Logo"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-xl font-semibold">
                            {post.company} | {post.role} |{" "}
                            {post.expyr == 0
                              ? "Fresher"
                              : `Experience ${post.expyr} year`}
                          </p>
                          <p className="text-gray-600 font-bold">
                            {post.rounds} Rounds | 6 Coding Problems
                          </p>
                        </div>
                      </div>
                      <div className="font-bold mr-2">{post.date[0]}</div>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    {/* Profile block */}
                    <div className="px-4 py-2 flex items-center">
                      <div className="bg-gray-300 w-12 mx-2 h-12 rounded-full overflow-hidden">
                        <img
                          className="w-full  h-full object-cover"
                          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                          alt="Profile"
                        />
                      </div>
                      <div className="ml-4 px-1">
                        <p className="text-">{post.name}</p>
                        <p className="text-gray-600 text-sm">
                          {post.batch} Batch | Chitkara University
                        </p>
                      </div>
                      <div className="ml-auto flex">
                        <p
                          className={`font-bold ${
                            post.gotOffer === "yes"
                              ? "text-green-500"
                              : "text-red-900"
                          }`}
                        >
                          {post.gotOffer === "yes"
                            ? "Selected"
                            : "Not-Selected"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            
        )
      ) : (
        <div className="text-center text-2xl md:text-xl mt-8 mb-8 font-bold">
          No posts found
        </div>
      )}
        </div>

      </div>
       
        <div className="mb-8">
       
        </div>





      <div
        ref={emailRef}
        className="relative z-10 bg-white p-8 rounded-lg shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px] mx-auto mt-20"
      >
        <div className="font-bold flex mb-7">
          <button
            className="bg-indigo-500 text-gray-100 p-2 rounded tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
            onClick={() => emailRefBack()}
          >
            Back
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block text-sm font-bold text-gray-700"
          >
            Email Address*
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-8">
          <button
            className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
            type="button"
            onClick={() => checkUserExist()}
          >
            Next
          </button>
        </div>
      </div>

      <div
        ref={passRef}
        className="relative z-10 bg-gray-50 p-8 rounded-lg shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px] mx-auto mt-40 mb-20"
      >
        <div className="mb-4">
          <label
            htmlFor="newPass"
            className="block text-sm font-bold text-gray-700"
          >
            New Password*
          </label>
          <input
            id="newPass"
            name="newPass"
            type="text"
            className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="Enter New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
        </div>
        <div className="mb-8">
          <button
            className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
            type="button"
            onClick={() => handleNewPass()}
          >
            Change Password
          </button>
        </div>
      </div>

      <dialog id="editModal" className="modal">
        <div className="modal-box px-10">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Edit your name</h3>
          <form onSubmit={handleSaveEdit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Enter your Name
                </span>
              </label>
              <textarea
                type="text"
                className="textarea h-10 textarea-bordered mb-3"
                value={editname}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <button className="btn btn-primary mt-3" type="submit">
              Save
            </button>
          </form>
        </div>
      </dialog>

      <Footer />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "80vh",
    borderRadius: "10px",
  },
  profileContainer: {
    textAlign: "center",
    marginTop: "50px",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "60%",
    marginBottom: "20px",
    height: "50vh",
    width: "950%",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    margin: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
export default Profile;
