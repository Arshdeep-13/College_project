import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { MdDeleteForever } from "react-icons/md";

import { TiTick } from "react-icons/ti";
import AdminNavbar from "../components/AdminNavbar";

function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [approvedTechQuestions, setApprovedTechQuestions] = useState([]);
  const [approvedHRQuestions, setApprovedHRQuestions] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getDocs(collection(db, "formResponses"));
      const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleCheckboxChange = async (e, id) => {
    const docRef = doc(db, "formResponses", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const newData = { ...data, isApproved: !e.target.checked };
    await setDoc(docRef, newData);
    fetchData();
  };

  const handleEditClick = (entry) => {
    setSelectedPost(entry);
    setEditMode(true);
    document.getElementById("editModal").showModal();
  };

  const handleDeleteQuestion = (questionIndex, questionType) => {
    const updatedQuestions = [...selectedPost[`${questionType}Questions`]];
    updatedQuestions.splice(questionIndex, 1);
    setSelectedPost({
      ...selectedPost,
      [`${questionType}Questions`]: updatedQuestions,
    });
  };

  const handleSaveEdit = async () => {
    const docRef = doc(db, "formResponses", selectedPost.id);
    await setDoc(docRef, selectedPost);
    fetchData();
    setEditMode(false);
    document.getElementById("editModal").close();
  };

  const handleCloseModal = () => {
    document.getElementById("editModal").close();
  };

  const handleApproveTechQuestion = (index) => {
    const updatedQuestions = [...approvedTechQuestions];
    updatedQuestions[index] = !updatedQuestions[index];
    setApprovedTechQuestions(updatedQuestions);
  };

  const handleApproveHRQuestion = (index) => {
    const updatedQuestions = [...approvedHRQuestions];
    updatedQuestions[index] = !updatedQuestions[index];
    setApprovedHRQuestions(updatedQuestions);
  };

  useEffect(() => {
    document.title = "Admin Panel";
    fetchData();
  }, []);

  return (
    <div>
      <AdminNavbar />
      {!user === null ? (
        <Loader />
      ) : (
        <>
          <div className="overflow-x-auto m-auto mt-14 p-8">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Post</th>
                  <th>Status</th>
                  <th>Display</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {console.log(posts)}
                {loading ? (
                  <Loader />
                ) : (
                  posts.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{entry.name}</div>
                            <div className="text-sm opacity-50">
                              {entry.company}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <button onClick={() => handleEditClick(entry)}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <span
                          className={`badge badge-ghost badge-sm ${
                            entry.isApproved ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {entry.isApproved ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          className="toggle"
                          checked={entry.isApproved}
                          onChange={(e) => handleCheckboxChange(e, entry.id)}
                        />
                      </td>
                      <td>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(entry.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
              <h3 className="font-bold text-lg">Edit the Response:</h3>
              <form>
                {selectedPost && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Name</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="First Name"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.name}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          name: e.target.value,
                        })
                      }
                    />
                    <label className="label">
                      <span className="label-text font-semibold">CGPA</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="CGPA"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.cgpa}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          cgpa: e.target.value,
                        })
                      }
                    />
                    <label className="label">
                      <span className="label-text font-semibold">
                        Got Offer
                      </span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Got Offered Yes/No"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.gotOffer}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          gotOffer: e.target.value,
                        })
                      }
                    />

                    <label className="label">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Email"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.email}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          email: e.target.value,
                        })
                      }
                    />
                    <label className="label">
                      <span className="label-text font-semibold">Phone</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Phone"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.mobileNo}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          phone: e.target.value,
                        })
                      }
                    />
                    <label className="label">
                      <span className="label-text font-semibold">
                        LinkedIn Profile Link
                      </span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="LinkedIn"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.linkedin}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          linkedin: e.target.value,
                        })
                      }
                    />

                    <label className="label">
                      <span className="label-text font-semibold">Company</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Company"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.company}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          company: e.target.value,
                        })
                      }
                    />
                    <label className="label">
                      <span className="label-text font-semibold">Job Role</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Job Role"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.role}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          role: e.target.value,
                        })
                      }
                    />
                    <label className="label">
                      <span className="label-text font-semibold">
                        Interview Rounds
                      </span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Interview Rounds"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.rounds}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          rounds: e.target.value,
                        })
                      }
                    />
                    <label className="label">
                      <span className="label-text font-semibold">
                        Eligibility
                      </span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Eligibility"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.eligibility}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          eligibility: e.target.value,
                        })
                      }
                    />
                    <label className="label">
                      <span className="label-text font-semibold">
                        Preparation Tips
                      </span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Preparation Tips"
                      className="textarea h-10 textarea-bordered mb-3"
                      value={selectedPost.preparationTips}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          preparationTips: e.target.value,
                        })
                      }
                    />

                    {selectedPost && (
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Technical Questions
                          </span>
                        </label>
                        {selectedPost.techQuestions &&
                          selectedPost.techQuestions.map((question, index) => (
                            <div className="form-control" key={index}>
                              <label className="label">
                                <span className="label-text">{`Technical Question ${
                                  index + 1
                                }`}</span>
                              </label>
                              <div className="flex items-center">
                                <textarea
                                  type="text"
                                  placeholder={`Technical Question ${
                                    index + 1
                                  }`}
                                  className="textarea h-10 textarea-bordered mb-3 w-full"
                                  value={selectedPost.techQuestions[index]}
                                  onChange={(e) => {
                                    const updatedQuestions = [
                                      ...selectedPost.techQuestions,
                                    ];
                                    updatedQuestions[index] = e.target.value;
                                    setSelectedPost({
                                      ...selectedPost,
                                      techQuestions: updatedQuestions,
                                    });
                                  }}
                                />
                                <div className="flex items-center">
                                  <MdDeleteForever
                                    onClick={() =>
                                      handleDeleteQuestion(index, "tech")
                                    }
                                    className="text-red-500 cursor-pointer mx-2"
                                    size={20}
                                  />
                                  {/* <TiTick
                onClick={() => handleApproveTechQuestion(index)}
                className={`text-green-500 cursor-pointer mx-2 ${
                  approvedTechQuestions[index] ? 'opacity-100' : 'opacity-30'
                }`}
              /> */}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {selectedPost && (
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">
                            HR Questions
                          </span>
                        </label>
                        {selectedPost.hrQuestions &&
                          selectedPost.hrQuestions.map((question, index) => (
                            <div className="form-control" key={index}>
                              <label className="label">
                                <span className="label-text">{`HR Question ${
                                  index + 1
                                }`}</span>
                              </label>
                              <div className="flex items-center">
                                <textarea
                                  type="text"
                                  placeholder={`HR Question ${index + 1}`}
                                  className="textarea h-10 textarea-bordered mb-3 w-full"
                                  value={selectedPost.hrQuestions[index]}
                                  onChange={(e) => {
                                    const updatedQuestions = [
                                      ...selectedPost.hrQuestions,
                                    ];
                                    updatedQuestions[index] = e.target.value;
                                    setSelectedPost({
                                      ...selectedPost,
                                      hrQuestions: updatedQuestions,
                                    });
                                  }}
                                />
                                <div className="flex items-center">
                                  <MdDeleteForever
                                    onClick={() =>
                                      handleDeleteQuestion(index, "hr")
                                    }
                                    className="text-red-500 cursor-pointer mx-2"
                                    size={20}
                                  />
                                  {/* <TiTick
                onClick={() => handleApproveHRQuestion(index)}
                className={`text-green-500 cursor-pointer mx-2 ${
                  approvedHRQuestions[index] ? 'opacity-100' : 'opacity-30'
                }`}
              /> */}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </form>
              <button className="btn btn-primary mt-3" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
}

export default Admin;
