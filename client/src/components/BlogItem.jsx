import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
import Loader from "./Loader";

const getCompanyLogo = (company) => {
  switch (company) {
    case "Microsoft":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png";
    case "Google":
      return "https://imgs.search.brave.com/RhIO_Tc-OGhbwwdc61rqGCfFacsUlQPNcaIZxOl_CZk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmxvZ29teXdheS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMDEvZ29vZ2xl/LXN5bWJvbC5qcGc";
    case "Adobe":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Adobe_Acrobat_DC_logo_2020.svg/1200px-Adobe_Acrobat_DC_logo_2020.svg.png";
    default:
      return "https://files.codingninjas.in/company-25223.svg";
  }
};

const popularCompanies = [
  "Microsoft",
  "Google",
  "Adobe",
  "Atlassian",
  "Amazon",
];

function BlogItem() {
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getDocs(collection(db, "formResponses"));
  //     const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     setPosts(data);
  //     setSearchedPosts(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = await fetch("http://localhost:8000/get-experience");
        response = await response.json();
        setSearchedPosts(response.exp);
        // const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // setPosts(data);
        // setSearchedPosts(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    let filteredPosts = posts;

    if (selectedCompany) {
      filteredPosts = filteredPosts.filter(
        (post) => post.company === selectedCompany
      );
    }

    filteredPosts = filteredPosts.filter((post) =>
      post.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchedPosts(filteredPosts);
  }

  return (
    <div id="list_of_exp">
      <div className="flex items-center mb-4 ml-[8%]">
        <p className="me-4">Sort By Companies : </p>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mr-2"
        >
          <option value="">All Companies</option>
          {popularCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-700 text-white p-2 rounded-full ml-2 px-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all"
        >
          Search
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        searchedPosts.map(
          (post) =>
            post.isApproved && (
              <div className="py-3 " key={post._id}>
                <Link to={`/post/${post._id}`}>
                  <div className="max-w-[85%] mx-auto bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow mt-8 p-2 shadow">
                    {/* Title block */}
                    <div className="p-4 flex items-center ">
                      <div className="w-14 h-14 rounded overflow-hidden">
                        <img
                          className="w-full h-full object-cover "
                          src={getCompanyLogo(post.company)}
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
        )
      )}
    </div>
  );
}

export default BlogItem;
