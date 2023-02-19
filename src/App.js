import "./App.css";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicsByPerso from "./pages/ComicsByPerso";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favoris from "./pages/Favoris";
import Cookies from "js-cookie";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeartCirclePlus,
  faHeart,
  faMagnifyingGlass,
  faPlus,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faHeartCirclePlus,
  faHeart,
  faMagnifyingGlass,
  faPlus,
  faArrowLeft,
  faArrowRight
);

function App() {
  const cookie = Cookies.get("favCookies") || "[]";
  const newCookie = JSON.parse(cookie);
  const [favorites, setFavorites] = useState(newCookie);
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  const handleFavorites = (fav) => {
    const favExist = favorites.find((f) => {
      return fav.id === f.id;
    });
    if (!favExist) {
      const newFavorite = [...favorites];
      newFavorite.push(fav);
      setFavorites(newFavorite);
      Cookies.set("favCookies", JSON.stringify(newFavorite), { expires: 30 });
      toast.success("Successfully added to favorites!");
    } else {
      const newFavorite = favorites.filter((f) => {
        return fav.id !== f.id;
      });
      setFavorites(newFavorite);
      Cookies.set("favCookies", JSON.stringify(newFavorite), { expires: 30 });
      toast("Successfully removed from favorites!", {
        icon: "🗑",
      });
    }
  };

  return (
    <Router>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<Home setUser={setUser} token={token} />} />
        <Route
          path="/comics"
          element={
            <Comics
              setUser={setUser}
              token={token}
              handleFavorites={handleFavorites}
            />
          }
        />
        <Route
          path="/characters"
          element={
            <Characters
              setUser={setUser}
              token={token}
              handleFavorites={handleFavorites}
            />
          }
        />
        <Route
          path="/comics/:characterId"
          element={
            <ComicsByPerso
              setUser={setUser}
              token={token}
              handleFavorites={handleFavorites}
            />
          }
        />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/favoris"
          element={
            <Favoris
              setUser={setUser}
              token={token}
              favorites={favorites}
              handleFavorites={handleFavorites}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
