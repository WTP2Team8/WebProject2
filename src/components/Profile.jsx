import { useState } from "react";
import Button from "../components/Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { updateUserInfo } from "../services/users.service";

export default function Profile() {
  const { userData } = useContext(AppContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState("");

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
    setError("");
  };

  const editInfo = async () => {
    if (form.firstName.length < 4 || form.firstName.length > 32) {
      setError("Първото име трябва да е с дължина между 4 и 32 символа!");
      return;
    }

    if (form.lastName.length < 4 || form.lastName.length > 32) {
      setError("Фамилията трябва да бъде с дължина между 4 и 32 символа!");
      return;
    }

    await updateUserInfo(userData.handle, "firstName", form.firstName);
    await updateUserInfo(userData.handle, "lastName", form.lastName);
    setError(
      <span style={{ color: "green" }}>Вашите данни са променени успешно!</span>
    );
  };

  return (
    <div id="sign-up-view">
      <h1>Промяна на информация</h1>
      {error && <div id="error">{error}</div>}
      <label htmlFor="handle">Име: </label>
      <input
        value={form?.firstName}
        onChange={updateForm("firstName")}
        type="text"
        name="firstName"
        id="firstName"
      />
      <label htmlFor="lastName">Фамилия: </label>
      <input
        value={form?.lastName}
        onChange={updateForm("lastName")}
        type="text"
        name="lastName"
        id="lastName"
      />
      <label htmlFor="handle">Потребителско име: </label>
      <span>{userData?.handle}</span>
      <br />
      <label htmlFor="email">Имейл: </label>
      <span>{userData?.email}</span>
      <br />
      <Button onClick={editInfo}>Промени</Button>
    </div>
  );
}
