import React from "react";
import Button from "./Button";
import { logoutUser } from "../services/auth.service";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export default function LogoutButton() {
    const { user, userData, setContext } = useContext(AppContext);

    const logout = async () => {
      await logoutUser();
      setContext({ user: null, userData: null });
    };
    return (
        <Button
            onClick={logout}
            style={{ textAlign: "center", fontWeight: "bold" }}
        >
            Изход
        </Button>
    );
}