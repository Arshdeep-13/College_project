import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [gotOffer, setGotOffer] = useState("");
  const [location, setLocation] = useState("");
  const [rounds, setRounds] = useState(1);
  const [batch, setBatch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [universityID, setUniversityID] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [questions, setQuestions] = useState(0);
  const [eligibility, setEligibility] = useState("");
  const [preparationTips, setPreparationTips] = useState("");
  const [hrQuestions, setHRQuestions] = useState([""]);
  const [mistakes, setMistakes] = useState("");
  const [techQuestions, setTechQuestions] = useState([""]);
  const [interviewPrep, Setinterviewprep] = useState("");
  const [IPSubjects, setIPSubjects] = useState([""]);
  const isApproved = true;

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    const uid = sessionStorage.getItem("uid");

    name == undefined || null ? "" : setName(name);
    email == undefined || null ? "" : setEmail(email);
    uid == undefined || null ? "" : setUniversityID(uid);
    uid == undefined || null ? "" : setBatch(20 + uid.slice(0, 2));
  }, []);

  const addHRQuestion = () => {
    setHRQuestions([...hrQuestions, ""]);
  };
  const addIPSubjects = () => {
    setIPSubjects([...IPSubjects, ""]);
  };

  const addTechQuestion = () => {
    setTechQuestions([...techQuestions, ""]);
  };

  const handleNextClick1 = () => {
    if (company.trim() !== "" && role.trim() !== "") {
      setQuestions(1);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const handlePrevClick1 = () => {
    setQuestions(0);
  };

  const handlePrevClick2 = () => {
    setQuestions(1);
  };

  const handleNextClick2 = () => {
    if (name.trim() !== "" && email.trim() !== "") {
      setQuestions(2);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const handleSubmit = async () => {
    const currentDate = new Date().toDateString();
    const formData = {
      company,
      role,
      gotOffer,
      location,
      rounds,
      batch,
      name,
      email,
      universityID,
      mobileNo,
      linkedin,
      cgpa,
      eligibility,
      preparationTips,
      hrQuestions,
      techQuestions,
      mistakes,
      isApproved,
      interviewPrep,
      date: currentDate,
      ipSubjects: IPSubjects,
    };

    try {
      console.log(formData);
      let res = await fetch(`${import.meta.env.VITE_SERVER}/experience`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      });
      res = await res.json();
      console.log(res);
      if (res.success) {
        toast.success("Form Submitted Successfully");
        navigate("/formSubmitted");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      {questions === 0 && (
        <div>
          <div className="lg:mx-[12%] my-16 p-10">
            <p className="font-bold text-3xl">Interview Experience</p>
            <p className="font-semibold text-xl mt-10 font-sans">ROLE INFO.</p>

            <div className="flex lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Company you Applied to?*
                </label>
                <input
                  type="text"
                  required
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                  placeholder="Eg. Amazon,Google etc."
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
              <div className="w-80">
                <div className="w-80">
                  <label className="block font-semibold mt-8 mb-5">
                    Batch*
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="Eg. 2021"
                    value={batch}
                    className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Any eligibility Criteria?*
                </label>
                <input
                  value={eligibility}
                  required
                  placeholder="Eg. CGPA Above 7 or No in case there is No Eligibility Criteria"
                  className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4  appearance-none leading-5 text-gray-700 w-80"
                  onChange={(e) => setEligibility(e.target.value)}
                />
              </div>

              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Role for Which you applied*
                </label>
                <input
                  type="text"
                  required
                  placeholder="Eg. Sde,Analyst etc"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold my-12 w-full">
                  Did you get an offer?*
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="offerOption"
                      value="yes"
                      onChange={(e) => setGotOffer(e.target.value)}
                      checked={gotOffer === "yes"}
                    />
                    <span className="mx-5">Yes</span>
                  </label>

                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="offerOption"
                      value="no"
                      onChange={(e) => setGotOffer(e.target.value)}
                      checked={gotOffer === "no"}
                    />
                    <span className="mx-5">No</span>
                  </label>
                </div>
              </div>
              <div className="w-80">
                <label className="block font-semibold my-12">
                  Location Of company?*
                </label>
                <input
                  type="text"
                  placeholder="Eg. Hyedrabad,Pune,Delhi etc."
                  required
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  No. of Rounds*
                </label>
                <input
                  type="number"
                  onChange={(e) => {
                    if (e.target.value < 0) {
                      setRounds(0);
                    } else {
                      setRounds(e.target.value);
                    }
                  }}
                  value={rounds}
                  className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>

              <div className="w-80"></div>
            </div>
            <button
              onClick={handleNextClick1}
              type="button"
              className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-10 transition duration-300 transform hover:scale-105 my-12"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {questions === 1 && (
        <div>
          <div className="lg:mx-[12%] my-16 p-10">
            <p className="font-bold text-3xl">Interview Experience</p>
            <p className="font-semibold text-xl mt-10 font-sans">
              YOUR PROFILE
            </p>
            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Your Name*
                </label>
                <input
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Your E-mail*
                </label>
                <input
                  type="email"
                  required
                  placeholder="Eg. ABC@xyz.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  University ID*
                </label>
                <input
                  type="number"
                  required
                  onChange={(e) => setUniversityID(e.target.value)}
                  value={universityID}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  LinkedIn Profile Link
                </label>
                <input
                  type="url"
                  onChange={(e) => setLinkedin(e.target.value)}
                  value={linkedin}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Your CGPA*
                </label>
                <input
                  type="number"
                  onChange={(e) => {
                    if (e.target.value < 0) {
                      setCgpa(0);
                    } else {
                      setCgpa(e.target.value);
                    }
                  }}
                  value={cgpa}
                  className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
            </div>
            <button
              onClick={handlePrevClick1}
              type="button"
              className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
            >
              Previous
            </button>
            <button
              onClick={handleNextClick2}
              type="button"
              className="bg-blue-600 float-right hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {questions == 2 && (
        <div>
          <div className="lg:mx-[12%] my-16 p-10">
            <p className="font-bold text-3xl">Interview Experience</p>
            <label className="block font-semibold mt-8 mb-5">
              {" "}
              Share your Interview Experience ?
            </label>
            <textarea
              value={mistakes}
              placeholder="Please Share some preparation tips if there is any."
              className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%] "
              onChange={(e) => setMistakes(e.target.value)}
            />
            <label className="block font-semibold mt-8 mb-5">
              Interview Preparation
            </label>
            <textarea
              value={interviewPrep}
              placeholder="Please Share some Interview preparation."
              className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%] "
              onChange={(e) => Setinterviewprep(e.target.value)}
            />
            <label className="block font-semibold mt-8 mb-5">
              Preparation Tips
            </label>
            <textarea
              value={preparationTips}
              placeholder="Please Share some preparation tips if there is any."
              className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%] "
              onChange={(e) => setPreparationTips(e.target.value)}
            />
            <div>
              <p className="font-semibold text-xl mt-10 font-sans">
                HR Questions
              </p>
              {hrQuestions.map((question, index) => (
                <div key={index}>
                  <label className="block font-semibold mt-8 mb-5">
                    HR Question {index + 1}
                  </label>
                  <textarea
                    value={question}
                    placeholder={`Enter HR Question ${index + 1}`}
                    onChange={(e) => {
                      const updatedHRQuestions = [...hrQuestions];
                      updatedHRQuestions[index] = e.target.value;
                      setHRQuestions(updatedHRQuestions);
                    }}
                    className="border-2 border-gray-300 focus:outline-none  focus:border-orange-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%]"
                  />
                </div>
              ))}
              <button
                onClick={addHRQuestion}
                type="button"
                className="bg-blue-600  hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
              >
                ADD HR QUESTION
              </button>
            </div>
            <div>
              <p className="font-semibold text-xl mt-10 font-sans">
                Interview Preparation Subjects
              </p>
              {IPSubjects.map((question, index) => (
                <div key={index}>
                  <label className="block font-semibold mt-8 mb-5">
                    IP Subject {index + 1}
                  </label>
                  <textarea
                    value={question}
                    placeholder={`Enter IP Subjects ${index + 1}`}
                    onChange={(e) => {
                      const updatedIPSubjects = [...IPSubjects];
                      updatedIPSubjects[index] = e.target.value;
                      setIPSubjects(updatedIPSubjects);
                    }}
                    className="border-2 border-gray-300 focus:outline-none  focus:border-orange-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%]"
                  />
                </div>
              ))}
              <button
                onClick={addIPSubjects}
                type="button"
                className="bg-blue-600  hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
              >
                ADD IP SUBJECTS
              </button>
            </div>
            <div>
              <p className="font-semibold text-xl mt-10 font-sans">
                Technical Questions
              </p>
              {techQuestions.map((question, index) => (
                <div key={index}>
                  <label className="block font-semibold mt-8 mb-5">
                    Technical Question {index + 1}
                  </label>
                  <textarea
                    value={question}
                    placeholder={`Enter Technical Question ${index + 1}`}
                    onChange={(e) => {
                      const updatedTechQuestions = [...techQuestions];
                      updatedTechQuestions[index] = e.target.value;
                      setTechQuestions(updatedTechQuestions);
                    }}
                    className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%]"
                  />
                </div>
              ))}
              <button
                onClick={addTechQuestion}
                type="button"
                className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
              >
                ADD TECH QUESTIONS
              </button>
            </div>
            <button
              onClick={handlePrevClick2}
              type="button"
              className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
            >
              Previous
            </button>
            <Link
              to="/formSubmitted"
              onClick={handleSubmit}
              className="bg-blue-600 float-right hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
            >
              SUBMIT
            </Link>
          </div>
        </div>
      )}
      ;
    </div>
  );
}
export default Form;
