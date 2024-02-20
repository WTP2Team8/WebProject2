import { useState } from "react";
import Button from "../components/Button";
import { registerUser } from "../services/auth.service";
import { createUserHandle } from "../services/users.service";
import { getUserByHandle } from "../services/users.service";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const { setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    handle: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
    setError("");
  };

  const register = async () => {
    if (form.firstName.length < 4 || form.firstName.length > 32) {
      setError("Първото име трябва да е с дължина между 4 и 32 символа!");
      return;
    }

    if (form.lastName.length < 4 || form.lastName.length > 32) {
      setError("Фамилията трябва да бъде с дължина между 4 и 32 символа!");
      return;
    }

    if (!form.handle) {
      setError("Необходимо е потребителско име!");
      return;
    }

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isValid = isValidEmail(form.email);

    if (!isValid) {
      setError("Невалиден имейл!");
      return;
    }

    if (!form.password) {
      setError("Необходима е парола!");
      return;
    }

    try {
      const user = await getUserByHandle(form.handle);
      if (user.exists()) {
        console.log(user.val());
        return console.log(
          `Потребителско име @${form.handle} вече съществува!`
        );
      }
      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(
        form.firstName,
        form.lastName,
        form.handle,
        credentials.user.uid,
        form.email
      );

      setContext({ user, userData: null });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div id="sign-up-view" className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Регистрация</h1>
      {error && <div id="error" className="text-red-500 mb-4">{error}</div>}
      <label htmlFor="handle" className="mb-2">Име: </label>
      <input
        value={form.firstName}
        onChange={updateForm("firstName")}
        type="text"
        name="firstName"
        id="firstName"
        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
      />
      <label htmlFor="lastName" className="mb-2">Фамилия: </label>
      <input
        value={form.lastName}
        onChange={updateForm("lastName")}
        type="text"
        name="lastName"
        id="lastName"
        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
      />
      <label htmlFor="handle" className="mb-2">Потребителско име: </label>
      <input
        value={form.handle}
        onChange={updateForm("handle")}
        type="text"
        name="handle"
        id="handle"
        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
      />
      <br />
      <label htmlFor="email" className="mb-2">Имейл: </label>
      <input
        value={form.email}
        onChange={updateForm("email")}
        type="text"
        name="email"
        id="email"
        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
      />
      <br />
      <label htmlFor="password" className="mb-2">Парола: </label>{" "}
      <input
        value={form.password}
        onChange={updateForm("password")}
        type="password"
        name="password"
        id="password"
        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
      />{" "}
      <br /> <br />
      <Button onClick={register}>Регистрация</Button>
    </div>
  );
}
