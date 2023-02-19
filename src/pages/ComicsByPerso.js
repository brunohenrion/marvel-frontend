import axios from "axios";
import logo from "../img/logo.svg";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ComicsByPerso = ({
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
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--6gc2xpkgkrgz.code.run/comics/${characterId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <div className="loading">
      <p>En cours de chargement...</p>
    </div>
  ) : token ? (
    <div>
      <header>
        <div className="comicsbyperso">
          <Link className="lien" to={"/"}>
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </Link>

          <div className="button">
            <Link className="lien" to={"/comics"}>
              <button>Comics</button>
            </Link>

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
        </div>
      </header>
      <div className="container">
        <div className="comicsbyid-content">
          <div className="characterPic">
            <img
              src={data.thumbnail.path + "." + data.thumbnail.extension}
              alt="characterPic"
            />
          </div>
          <div className="container">
            <div className="comics-container">
              <div className="carousel">
                {data.comics.map((elem, index) => {
                  return (
                    <section key={index} className="comicById-container">
                      <Card
                        key={elem._id}
                        id={elem._id}
                        name={elem.title}
                        description={elem.description}
                        image={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                        handleFavorites={handleFavorites}
                        type="comics"
                      />
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ComicsByPerso;
