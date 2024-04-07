import "./App.css";

import Admin from "./pages/Admin";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Submitted from "./pages/Submitted";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Form from "./pages/Form";
import BlogPost from "./components/BlogPost";
import Questions from "./pages/Questions";
import InterviewForm from "./pages/InterviewForm";
import Error404 from "./pages/Error404";
import LandingPage from "./components/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const validate = sessionStorage.getItem("token");
    console.log("token" + validate)
    const admin = sessionStorage.getItem("isAdmin");
    if (validate) {
      setIsAuth(validate);
    }
    if (admin) {
      setIsAdmin(admin);
    }

    // console.log(isAdmin, isAuth);
  }, [isAuth, isAdmin]);

  return (
    <Router>
      {/* <Navbar/> */}
      {/* <Routes>
        <Route
          path="/"
          element={
            isAuth == null ? <LandingPage /> : isAdmin ? <Admin /> : <Home />
          }
        />
        <Route
          path="/home"
          element={isAuth == null ? <Login /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route
          path="/login"
          element={isAuth == null ? <Login /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route
          path="/signin"
          element={isAuth == null ? <SignIn /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route
          path="/signup"
          element={isAuth == null ? <SignUp /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route
          path="/admin"
          element={isAuth ? <Admin /> : <SignIn />}
        />
        <Route
          path="/formSubmitted"
          element={isAuth == null ? <Home /> : <Submitted />}
        />
        <Route path="/form" element={isAuth ? <Form /> : <Navigate to="/login" /> }/>
        <Route path="*" element={<Error404 />} />
        <Route path="/questions" element={isAuth ? <Questions/> : <Navigate to="/login" /> }/>
        <Route path="/post/:id" element={  isAuth ? <BlogPost /> : <Navigate to="/login" />} />
      </Routes> */}





      {/* <Routes>
        <Route
          path="/"
          element={
            isAuth == null ? <LandingPage /> : isAdmin ? <Admin /> : <Home />
          }
        />
        <Route
          path="/home"
          element={isAuth == null ? <Login /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route
          path="/login"
          element={isAuth == null ? <Login /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route
          path="/signin"
          element={isAuth == null ? <SignIn /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route
          path="/signup"
          element={isAuth == null ? <SignUp /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route path="/form" element={isAuth ? <Form /> : <Navigate to="/login" /> }/>
        <Route path="*" element={<Error404 />} />
        <Route path="/questions" element={isAuth ? <Questions/> : <Navigate to="/login" /> }/>
        <Route path="/post/:id" element={  isAuth ? <BlogPost /> : <Navigate to="/login" />} />
      </Routes> */}




<Routes>

        <Route path = "/Login" element={<Login/>}/>
        {/* <Route path='/sign-in' element={<SignIn/>} /> */}
        <Route path='/' element={<LandingPage/>}/>
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path='/home' element={  isAuth ? <Home/>: <Login />  }/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route
          path="/formSubmitted"
          element={isAuth == null ? <Home /> : <Submitted />}
        />
        <Route
          path="/admin"
          element={isAuth ? <Admin /> : <Login />}
        />
        <Route path="/form" element={isAuth ? <Form /> : <Login/> }/>
        <Route path="*" element={<Error404 />} />
        <Route path="/questions" element={isAuth ? <Questions/> : <Login/> }/>
        <Route path="/post/:id" element={  isAuth ? <BlogPost /> : <Login/>} />
        {/* <Route path='/signin' element={<SignIn/>}/> */}
        </Routes>








    </Router>
  );
}

export default App;
