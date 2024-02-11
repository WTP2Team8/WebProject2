import { useState } from "react";
import Button from "../components/Button";
import { registerUser } from "../services/auth.service";
import { createUserHandle } from "../services/users.service";
import { getUserByHandle } from "../services/users.service";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    handle: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };
  const register = async () => {
    // TODO: Validate inputs
    try {
      const user = await getUserByHandle(form.handle);
      if (user.exists()) {
        console.log(user.val());
        return console.log(
          `Потребителско име @${form.handle} вече съществува !`
        );
      }
      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(form.handle, credentials.user.uid, form.email);

      setContext({ user, userData: null });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
