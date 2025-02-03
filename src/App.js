import React, { useState } from "react";
import { importBooks } from "./api/api";

function App() {
  const [message, setMessage] = useState("");

  const handleImportBooks = async () => {
    const result = await importBooks();
    setMessage(result);
  };

  return (
    <div className="App">
      <h1>Library Tracker</h1>
      <button onClick={handleImportBooks}>Import Books</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
