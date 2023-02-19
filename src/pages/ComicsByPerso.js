import axios from "axios";
import logo from "../img/logo.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ComicsByPerso = ({ setUser }) => {
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
    <p>En cours de chargement...</p>
  ) : (
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
          <div className="carousel">
            {data.comics.map((elem, index) => {
              const comicPicture =
                elem.thumbnail.path + "." + elem.thumbnail.extension;

              return (
                <section key={index} className="comicById-container">
                  <img src={comicPicture} alt="" />
                  <h1>{elem.title}</h1>
                  <p>{elem.description}</p>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicsByPerso;
