import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdminNavbar from "./AdminNavbar";

const About = ({ isAuth, isAdmin }) => {
  return (
    <>
      {isAuth && isAdmin ? <AdminNavbar /> : <Navbar />}
      <Footer />
    </>
  );
};

export default About;
