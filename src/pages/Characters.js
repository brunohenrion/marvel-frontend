import axios from "axios";
import logo from "../img/logo.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Card from "../components/Card";

const Characters = ({
  setUser,
  token,
  handleFavorites,
  key,
  id,
  name,
  description,
  image,
  type,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--2dm7g26jk8pz.code.run/characters?name=${filters}&page=${page}`
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    console.log("useEffect executed");
  }, [filters, page]);

  return isLoading ? (
    <div className="loading">
      <p>En cours de chargement...</p>
    </div>
  ) : token ? (
    <div>
      <header>
        <Link to={"/"}>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </Link>

        <input
          type="search"
          placeholder="Recherchez votre Perso  ..."
          value={filters}
          onChange={(event) => {
            setFilters(event.target.value);
          }}
        />
        <div className="button">
          <Link className="lien" to={"/comics"}>
            <button>Comics</button>
          </Link>

          <Link className="lien" to={"/favoris"}>
            <button>Favoris</button>
          </Link>

          <Link className="lien" to={"/"}>
            <button
              onClick={() => {
                setUser();
              }}
            >
              Deconnexion
            </button>
          </Link>
        </div>
      </header>
      <div className="paginationcharacters">
        {page > 1 && (
          <button
            className="buttonleft"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            prev
          </button>
        )}
        <p className={page < 2 ? "display-none" : null}>{page}</p>
        <button
          className="buttonright"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          next
        </button>
      </div>

      <div className="container">
        <div className="character-container">
          {data.results.map((character) => {
            return (
              <section key={character._id}>
                <div className="character-big-card">
                  <Card
                    key={character._id}
                    id={character._id}
                    name={character.name}
                    description={character.description}
                    image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    link={`/comics/${character._id}`}
                    handleFavorites={handleFavorites}
                    type="heroes"
                  />
                </div>
                <h2>{character.name}</h2>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Characters;
