import { useEffect, useState } from "react";
import "./App.css";
import Home from "./views/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Authenticated from "./hoc/Authenticated";
import { AppContext } from "./context/AppContext";
import Register from "./views/Register";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config.js";
import { getUserData } from "./services/users.service";

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
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/tweets"
              element={
                <Authenticated>
                  <AllTweets />
                </Authenticated>
              }
            />
            <Route
              path="/tweets/:id"
              element={
                <Authenticated>
                  <SingleTweet />
                </Authenticated>
              }
            />
            <Route
              path="/tweets-create"
              element={
                <Authenticated>
                  <CreateTweet />
                </Authenticated>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
