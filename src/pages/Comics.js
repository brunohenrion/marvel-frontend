import axios from "axios";
import logo from "../img/logo.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Card from "../components/Card";

const Comics = ({
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
          `https://site--backend-marvel--2dm7g26jk8pz.code.run/comics?title=${filters}&page=${page}`
        );
        setData(response.data);
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
          placeholder="Recherchez votre BD ..."
          value={filters}
          onChange={(event) => {
            setFilters(event.target.value);
          }}
        />
        <div className="button">
          <Link className="lien" to={"/characters"}>
            <button>Personnages</button>
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
      <div className="paginationcomics">
        <button
          className={page < 2 ? "display-none" : null}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          prev
        </button>

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
        <div className="card-container">
          <div className="carousel"></div>
          {data.results.map((comics) => {
            return (
              <section key={comics._id}>
                <div className="comic-big-card">
                  <Card
                    key={comics._id}
                    id={comics._id}
                    name={comics.title}
                    description={comics.description}
                    image={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                    handleFavorites={handleFavorites}
                    type="comics"
                  />
                </div>
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

export default Comics;
