import { useEffect, useState } from "react";
import "./App.css";
import Home from "./views/Home";
import Contacts from "./views/Contacts";
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
