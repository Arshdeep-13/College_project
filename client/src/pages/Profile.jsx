import  { useEffect,useRef, useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import logo from "../assets/image.png"
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
const Profile = () => {
    const [name,setName] = useState("")
    const mainRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState("");
    const [newPass, setNewPass] = useState("");
    const [editname,setEditName] = useState(name);
    const [sessionEmail,setSessionEmail] = useState("")
    useEffect(()=>{
        const name = sessionStorage.getItem("name")
        const email = sessionStorage.getItem("email");
        name == undefined || null ? "" : setName(name);
        email == undefined || null ? "" : setSessionEmail(name);
        setName(name)
        setSessionEmail(email)
        mainRef.current.style.display = "block";
        emailRef.current.style.display = "none";
        passRef.current.style.display = "none";
    },[])
    const editProfile = () =>{

    }
    const handleEditClick = () => {
      setEditMode(true);
      document.getElementById("editModal").showModal();
    };
    const handleCloseModal = () => {
      document.getElementById("editModal").close();
    };
    const handleSaveEdit = async(event)=>{
      event.preventDefault()
        const config = {
          headers:{
            "Content-Type":"application/json"
          }
        }
       const res = await axios.put(`${import.meta.env.VITE_SERVER}/edit-name`,{editname,sessionEmail},config)
        if(res.data.success)
        {
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
        }else {
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
    }
    const handleNewPass = async () => {
        let res = await fetch(`${import.meta.env.VITE_SERVER}/changePassword-afterlogin`, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: newPass,
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
        mainRef.current.style.display = "block";
        emailRef.current.style.display = "none";
        passRef.current.style.display = "none";
      };

    const handleForgetPass = async () => {
        mainRef.current.style.display = "none";
        emailRef.current.style.display = "block";
        passRef.current.style.display = "none";
      };
      const emailRefBack = async () => {
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
  return (
    <div>
        <ToastContainer/>
    <Navbar />
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'5rem'}}>
    <div style={styles.container}  ref={mainRef}>
      <div style={styles.profileContainer}>
        <img
          src={logo}
          alt="Profile"
          style={styles.profilePicture}
        />
        <div style={styles.buttonsContainer}>
            <h4>Usename : {name}</h4>
          <button style={styles.button} onClick={() => handleEditClick()} >Edit Name</button>
          <button style={styles.button} onClick={() => handleForgetPass()}
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    type="button">Change Password</button>
          <button style={styles.button} onClick={editProfile}>Edit Profile Picture</button>
        </div>
      </div>
    </div>
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
          className="relative z-10 bg-white p-8 rounded-lg shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px] mx-auto mt-20"
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
                      <span className="label-text font-semibold">Enter your Name</span>
                    </label>
                    <textarea
                      type="text"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={editname}
                      onChange={(e) =>
                        setEditName(e.target.value)
                      }
                    />
                              </div>
                              <button
                className="btn btn-primary mt-3"
          type='submit'>
                Save
              </button>

              </form>
            </div>
          </dialog>


    <Footer />
  </div>
  )
}

const styles = {
    container: {
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width:'80vh',
      borderRadius:'10px'
    },
    profileContainer: {
      textAlign: 'center',
      marginTop: '50px',
      justifyContent:'center',
      alignItems:'center'
    },
    profilePicture: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:'60%',
      marginBottom: '20px',
      height: '50vh',
      width:'950%'
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      flexDirection:'column'
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      margin: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };
export default Profile