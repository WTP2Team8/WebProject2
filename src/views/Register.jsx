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
    <div id="sign-up-view">
      <h1>Регистрация</h1>
      {error && <div id="error">{error}</div>}
      <label htmlFor="handle">Име: </label>
      <input
        value={form.firstName}
        onChange={updateForm("firstName")}
        type="text"
        name="firstName"
        id="firstName"
      />
      <label htmlFor="lastName">Фамилия: </label>
      <input
        value={form.lastName}
        onChange={updateForm("lastName")}
        type="text"
        name="lastName"
        id="lastName"
      />
      <label htmlFor="handle">Потребителско име: </label>
      <input
        value={form.handle}
        onChange={updateForm("handle")}
        type="text"
        name="handle"
        id="handle"
      />
      <br />
      <label htmlFor="email">Имейл: </label>
      <input
        value={form.email}
        onChange={updateForm("email")}
        type="text"
        name="email"
        id="email"
      />
      <br />
      <label htmlFor="password">Парола: </label>{" "}
      <input
        value={form.password}
        onChange={updateForm("password")}
        type="password"
        name="password"
        id="password"
      />{" "}
      <br /> <br />
      <Button onClick={register}>Регистрация</Button>
    </div>
  );
}
