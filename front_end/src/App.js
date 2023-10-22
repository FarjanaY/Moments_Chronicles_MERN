//External Imports
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";

//Internal imports
import "./App.css";
import Login from "./components/logIn/Login";
import Navbar from "./components/navbar/NavBar";
import Register from "./components/register/Register.js";
import Settings from "./components/settings/Settings";
import SinglePost from "./components/singlePost/SinglePost";
import Write from "./components/write/Write";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import ErrorPage from "./components/errorPage/ErrorPage";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import { Context, ContextProvider } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <ContextProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/register"
            element={user ? <Home /> : <Register />}
          />
          <Route exact path="/login" element={user ? <Home /> : <Login />} />
          <Route
            exact
            path="/write"
            element={user ? <Write /> : <Register />}
          />
          <Route
            exact
            path="/settings"
            element={user ? <Settings /> : <Register />}
          />
          <Route exact path="/post/:postId" element={<SinglePost />} />
          <Route excat path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
