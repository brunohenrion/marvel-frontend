import logo from "../img/logo.svg";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Favorites = ({ setUser, token, favorites, handleFavorites }) => {
  const heroes = [];
  const comics = [];

  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].type === "heroes") {
      heroes.push(favorites[i]);
    } else {
      comics.push(favorites[i]);
    }
  }
  return token ? (
    <>
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
      <div className="fav-container">
        <section className="favorites-section ">
          <h1>Favorite Characters</h1>
          {heroes.map((elem) => {
            return (
              <>
                <div className="fav-div">
                  <img
                    src={elem.image}
                    alt="marvel images"
                    className="fav-images blue"
                  />

                  <h2>{elem.name}</h2>

                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      handleFavorites(elem);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </>
            );
          })}
        </section>
        <section className="favorites-section">
          <h1>Favorite Comics</h1>

          {comics.map((elem) => {
            return (
              <>
                <div className="fav-div">
                  <img
                    src={elem.image}
                    alt="marvel images"
                    className="fav-images purple"
                  />

                  <h2>{elem.name}</h2>

                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      handleFavorites(elem);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </>
            );
          })}
        </section>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorites;
