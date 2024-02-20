import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { loginUser } from "../services/auth.service";

export default function Login() {
  const { user, setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || "/");
    }
  }, [user]);

  const login = async () => {
    try {
      const credentials = await loginUser(form.email, form.password);
      setContext({ user: credentials.user, userData: null });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <label htmlFor="email" className="mb-2">
        Имейл:
      </label>
      <input
        value={form.email}
        onChange={updateForm("email")}
        type="text"
        id="email"
        name="email"
        className="border border-gray-300 rounded px-2 py-1 mb-2"
      />
      <br />
      <br />
      <label htmlFor="password" className="mb-2">
        Парола:
      </label>
      <input
        value={form.password}
        onChange={updateForm("password")}
        type="password"
        id="password"
        name="password"
        className="border border-gray-300 rounded px-2 py-1 mb-2"
      />
      <br />
      <br />
      <Button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded">
        Вход
      </Button>
    </div>
  );
}
