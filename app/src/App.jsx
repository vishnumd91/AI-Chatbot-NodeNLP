import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [answer, setAnswer] = useState("no ansers");

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:10000/bot?message=${textInput}`
      );
      setAnswer(response.data);
    } catch (error) {
      console.error("Error:", error.response);
      setAnswer("Error occurred"); // Set an error message if the request fails
    }
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Type Something..."
          value={textInput}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
      </form>
      <p>{answer}</p>
    </div>
  );
}
