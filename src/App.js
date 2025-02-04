import React, { useState } from "react";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import { importBooks } from "./api/api";

function App() {
  const [page, setPage] = useState("home");


  const navigate = (path) => {
    setPage(path);
  };

  return (
    <div>
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "search" && <SearchPage navigate={navigate} />}
    </div>
  );
}

export default App;
