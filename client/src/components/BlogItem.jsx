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
    case "Apple":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png";
    case "Amazon":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png";
    case "Atlassian":
      return "https://logos-world.net/wp-content/uploads/2023/03/Atlassian-Logo.png";
    case "Facebook":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png";
    case "TCS":
      return "https://companieslogo.com/img/orig/TCS.NS-7401f1bd.png?t=1631949260";
    case "Infosys":
      return "https://w7.pngwing.com/pngs/687/655/png-transparent-infosys-logo.png";
    case "Netflix":
      return "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
    default:
      return "https://files.codingninjas.in/company-25223.svg";
  }
};

const popularCompanies = [
  "Amazon",
  "Google",
  "Microsoft",
  "Facebook",
  "Apple",
  "Netflix",
  "Uber",
  "LinkedIn",
  "Twitter",
  "Salesforce",
  "Oracle",
  "Adobe",
  "Paypal",
  "Cisco",
  "IBM",
  "Intel",
  "Infosys",
  "Others",
];
const popularYear = [
"2016",
"2017",
"2018",
"2019",
"2020",
"2021",
"2022",
"2023",
"2024",
];

function BlogItem() {
  const [loading, setLoading] = useState(true);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [allCompany, setAllCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
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
        let response = await fetch(
          `${import.meta.env.VITE_SERVER}/get-experience`
        );
        response = await response.json();
        // Sort the fetched posts by date in descending order
        const sortedPosts = response.exp.sort((a, b) => {
          const timeA = new Date(`${a.date[0]} ${a.date[1]}`);
          const timeB = new Date(`${b.date[0]} ${b.date[1]}`);

          if (isNaN(timeA.getTime()) || isNaN(timeB.getTime())) {
            return 0;
          }

          return timeB - timeA;
        });

        setSearchedPosts(sortedPosts);
        setAllCompany(sortedPosts);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    let filteredPosts = allCompany;

    if (selectedCompany != "All Companies") {
      filteredPosts = filteredPosts.filter((post) => {
        return post.company.toLowerCase() == selectedCompany.toLowerCase();
      });
    }   else {
      filteredPosts = allCompany;
    }
    if (selectedYear !== "All years") {
      filteredPosts = filteredPosts.filter((post) => {
        const postDate = new Date(post.date[0]);
        const postYear = postDate.getFullYear().toString();
        console.log(postYear,selectedYear)
        return postYear === selectedYear;
      });
    }  else {
      filteredPosts = allCompany;
    }
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
          <option value="All Companies">All Companies</option>
          {popularCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
        <p className="me-4">Sort By Year : </p>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mr-2"
        >
          <option value="All years">All year</option>
          {popularYear.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleSearch()}
          className="bg-blue-700 text-white p-2 rounded-full ml-2 px-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all"
        >
          Search
        </button>
      </div>

      

      {loading ? (
        <Loader />
      ) : searchedPosts.length > 0 ? (
        searchedPosts.map(
          (post) =>
            post.isApproved && (
              <div className="py-3 " key={post._id}>
                <Link to={`/post/${post._id}`}>
                  <div className="max-w-[85%] mx-auto bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow mt-8 p-2 shadow">
                    {/* Title block */}
                    <div className="flex items-center justify-between">
                      <div className="p-4 flex items-center ">
                        <div className="w-10 h-10 rounded overflow-hidden flex items-center justify-centern">
                          <img
                            className="max-w-full max-h-full object-cover"
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
        )
      ) : (
        <div className="text-center text-2xl md:text-xl mt-8 mb-8 font-bold">
          No posts found
        </div>
      )}
    </div>
  );
}
export default BlogItem
