import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${term}`);
    setTerm("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Намери пост..."
        style={{width: 170, height: 25, marginRight: "20px", marginTop: "20px" }}
      />
      <button style={{ backgroundColor: "orange", color: "black", width: "70px", height: "25px" }} type="submit">Намери</button>
    </form>
  );
}
