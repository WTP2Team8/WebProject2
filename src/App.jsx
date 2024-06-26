import { useEffect, useState } from "react";
import "./App.css";
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
import AllPosts from "./views/AllPosts";
import SinglePost from "./views/SinglePost";
import CreatePost from "./views/CreatePost";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Profile";
import MeatCategory from "./views/Categories/MeatCategory";
import VegeterianCategory from "./views/Categories/VegeterianCategory";
import SoupsCategory from "./views/Categories/SoupsCategory";
import SaladsCategory from "./views/Categories/SaladsCategory";
import DesertsCategory from "./views/Categories/DesertsCategory";
// import OthersCategory from "./views/Categories/OthersCategory";
import SearchResults from "./views/SearchedItems";
import MyPosts from "./views/MyPosts";
import Home from "./views/Home";
import Favorites from "./views/Favorites";
import MyComments from "./views/MyComments";

function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  });

  const [user] = useAuthState(auth);

  if (context.user !== user) {
    setContext({ user });
  }

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((snapshot) => {
        // console.log(user.uid);

        if (snapshot.exists()) {
          // console.log(snapshot.val());

          setContext({
            user,
            userData: snapshot.val()[Object.keys(snapshot.val())[0]],
          });
        } else {
          console.log("No such document!");
        }
      });
    }
  }, [user]);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ ...context, setContext }}>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route
            path="/posts/:id"
            element={
              <Authenticated>
                <SinglePost />
              </Authenticated>
            }
          />
          <Route
            path="/posts-create"
            element={
              <Authenticated>
                <CreatePost />
              </Authenticated>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/meat-category" element={<MeatCategory />} />
          <Route path="/vegeterian-category" element={<VegeterianCategory />} />
          <Route path="/salads-category" element={<SaladsCategory />} />
          <Route path="/soups-category" element={<SoupsCategory />} />
          <Route path="/deserts-category" element={<DesertsCategory />} />
          <Route path="/search/:term" element={<SearchResults />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/my-comments" element={<MyComments />} />
        </Routes>
        <Footer />
      </AppContext.Provider>
    </BrowserRouter>
    // </div>
  );
}

export default App;
