import { useEffect, useState } from "react";
import "./App.css";
import Home from "./views/Home";
import Contacts from "./views/Contacts";
import Trending from "./views/Trending";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import Authenticated from "./hoc/Authenticated";
import { AppContext } from "./context/AppContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { getUserData } from "./services/users.service";
import Register from "./views/Register";
/* import CreatePost from "./views/Posts";
import AllPosts from "./views/AllPosts";
import Posts from "./views/Posts"; */
import AllPosts from "./views/AllPosts";
import SinglePost from "./views/SinglePost";
import CreatePost from "./views/CreatePost";

function App() {
  const [context, setContext] = useState({
    user: null,
    userDate: null,
  });

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setContext({
            user,
            userData: snapshot.val()[Object.keys(snapshot.val())[0]],
          });
        }
      });
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{ ...context, setContext }}>
        <Navbar />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/posts" element={<Authenticated><AllPosts /></Authenticated>} />
            <Route path="/posts/:id" element={<Authenticated><SinglePost /></Authenticated>} />
            <Route path="/posts-create" element={<Authenticated><CreatePost /></Authenticated>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}></Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
