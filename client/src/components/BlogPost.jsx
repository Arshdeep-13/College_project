import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
// import { db } from "../firebase";
import Loader from "./Loader";
// import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FaLinkedin, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hrques, setHrques] = useState([]);
  const [techques, setTechques] = useState([]);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const docRef = doc(db, 'formResponses', id);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       setPost({ id: docSnap.id, ...docSnap.data() });
  //     } else {
  //       console.log('No such document!');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching document: ', error);
  //   }
  //   setLoading(false);
  // };
  const fetchData = async () => {
    console.log(id);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/get-experience-question?id=${id}`
      );
      console.log(response.data);
      setPost(response.data.data);
      setHrques(response.data.hrques);
      setTechques(response.data.techques);
      setLoading(false);
    } catch (error) {
      console.log("Error from getting data in question page" + error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-3xl mx-auto p-4">
          <Link
            to="/"
            className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 hover:underline dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-6"
          >
            <h2 className="text-3xl font-bold lg:text-4xl mb-4">
              {post.company} | {post.role} |{" "}
              {post.expyr == 0 ? "Fresher" : `Experience ${post.expyr} year`}
            </h2>

            <div className="flex items-center gap-x-5 mb-4">
              <span className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                {post.name}
              </span>

              <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                Batch {post.batch} | Chitkara University
              </p>
            </div>

            <div className="mt-4">
              <section>
                <h3 className="text-xl font-semibold text-gray-900">
                  Introduction
                </h3>
                <p className="text-lg text-gray-800">
                  My name is {post.name}. I am an undergraduate student at
                  Chitkara University. I am currently in my {post.batch} batch.
                  I have been selected for the role of {post.role} at{" "}
                  {post.company}. Chitkara University Placement Cell has played
                  a major role in my success. I would like to share my interview
                  experience with you all. I hope it will help you in your
                  preparation.
                </p>
              </section>

              <section className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Application Process
                </h3>
                <p className="text-lg text-gray-800">
                  I got to know about the placement drive through the Placement
                  Cell of Chitkara University. I applied for the role of{" "}
                  {post.role} at {post.company}. I was shortlisted for the
                  interview round. There were {post.rounds} rounds in total. I
                  would like to share my interview experience with you all. I
                  hope it will help you in your preparation.
                </p>
              </section>

              <section className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Eligibility and Resume
                </h3>
                <p className="text-lg text-gray-800">
                  The eligibility criteria for the role was {post.eligibility}.
                  I was shortlisted for the interview based on my resume. I had
                  mentioned my projects, achievements, and skills in my resume.
                </p>
              </section>

              <section className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Interview Preparation
                </h3>
                <p className="text-lg text-gray-800">
                  I prepared for the interview from the following topics:
                  <ul className="list-disc list-inside">
                    <li>{post.interviewPrep}</li>
                    <li>Data Structures and Algorithms</li>
                    <li>Programming Language: Java / C++</li>
                    <li>Operating System</li>
                    <li>Database Management System</li>
                    <li>Object Oriented Programming</li>
                    <li>Software Engineering</li>
                    <li>Computer Networks</li>
                  </ul>
                </p>
              </section>

              <section className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Tips for Preparation
                </h3>
                <p className="text-lg text-gray-800">
                  I would like to share some tips with you all. I hope it will
                  help you in your preparation.
                  <ul className="list-disc list-inside">
                    <li>{post.preparationTips}</li>
                    <li>Start your preparation early.</li>
                    <li>Practice coding questions on a regular basis.</li>
                    <li>Practice previous year interview questions.</li>
                    <li>
                      Focus on your resume. Mention your projects, achievements,
                      and skills in your resume.
                    </li>
                  </ul>
                </p>
              </section>

              <section className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  HR Interview Round Questions
                </h3>
                <p className="text-lg text-gray-800">
                  I would like to share some questions with you all. I hope it
                  will help you in your preparation.
                  <ul className="list-disc list-inside">
                    {hrques.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                  Prepare answers for these questions. This will help you in
                  your preparation.
                </p>
              </section>

              <section className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Technical Interview Round Questions
                </h3>
                <p className="text-lg text-gray-800">
                  I would like to share some technical questions which were
                  asked in my interview. I hope it will help you in your
                  preparation.
                  <ul className="list-disc list-inside">
                    {techques.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                  Understand the constraints of the problem before writing the
                  code. Try to code from brute force approach to optimized
                  approach. This will help you in your preparation.
                </p>
              </section>

              <section className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Final Outcome
                </h3>
                <p className="text-lg text-gray-800">
                  I was{" "}
                  {post.gotOffer === "yes" ? (
                    <span className="text-green-500">selected</span>
                  ) : (
                    <span className="text-red-500">not selected</span>
                  )}{" "}
                  for the role of {post.role} at {post.company}. I would like to
                  thank Chitkara University Placement Cell for providing me this
                  opportunity. I would also like to thank PrepHelp for providing
                  me the platform to share my interview experience with you all.
                  I hope it will help you in your preparation. All the best for
                  your interviews.
                </p>
              </section>
            </div>

            <div className="text-center mt-6">
              <div className="grid lg:grid-cols-2 gap-3">
                {/* Add more images if needed */}
              </div>

              <span className="mt-3 block text-sm text-center text-gray-500">
                {/* {post.imageDescription} */}
              </span>
            </div>

            {/* Author Info */}
            <div className="group flex items-center gap-x-3 border-t border-gray-200 pt-6 mt-6 dark:border-gray-700">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                  alt="Author"
                />
              </div>
              <div className="flex flex-col">
                <a
                  href="#"
                  className="text-base font-medium text-gray-800 hover:underline"
                >
                  {post.name}
                </a>
                <p className="text-xs text-gray-500">
                  {post.batch} Batch | Chitkara University
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <p className="text-base text-gray-800 mt-4">
              Hey everyone, I am {post.name}. I am an undergraduate student at
              Chitkara University. I am currently in my {post.batch} batch.
              <br />
              If you have any queries regarding the interview process, you can
              contact me on my email id {post.email}. You can also connect with
              me on LinkedIn.
              <br />
              <FaLinkedin
                className="inline-block text-2xl text-blue-500 hover:text-blue-700 cursor-pointer my-4"
                onClick={() => window.open(post.linkedin, "_blank")}
              />
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BlogPost;
