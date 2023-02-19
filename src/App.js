import "./App.css";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicsByPerso from "./pages/ComicsByPerso";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import Favoris from "./pages/Favoris";
import Cookies from "js-cookie";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  // const [favoris, setFavoris] = useState(Cookies.get["favoris"] || []);
  // Cookies.set("favoris", favoris, { expires: 1 });

  const setUser = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setUser={setUser} token={token} />} />
        <Route
          path="/comics"
          element={
            <Comics
              setUser={setUser}
              token={token}
              // setFavoris={setFavoris}
              // favoris={favoris}
            />
          }
        />
        <Route
          path="/characters"
          element={<Characters setUser={setUser} token={token} />}
        />
        <Route
          path="/comics/:characterId"
          element={<ComicsByPerso setUser={setUser} />}
        />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* <Route
          path="/favoris"
          element={
            <Favoris
              setUser={setUser}
              setFavoris={setFavoris}
              favoris={favoris}
            />
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
