import logo from "../img/logo.svg";
import { Link } from "react-router-dom";

const Home = ({ setUser, token }) => {
  return (
    <div>
      <header>
        <img src={logo} alt="logo marvel" />
        <div className="button">
          {!token ? (
            <>
              <Link to="/login">
                <button>Se connecter</button>
              </Link>
              <Link to="/signup">
                <button>S'inscrire</button>
              </Link>
            </>
          ) : (
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => {
                setUser();
              }}
            >
              Deconnexion
            </button>
          )}
        </div>
      </header>

      <div className="imagefond">
        <section className="content-home">
          <Link to={"/comics"} className="link">
            <div className="left-home">
              <h1>
                LES <br /> COMICS
              </h1>
            </div>
          </Link>
          <Link to={"/characters"} className="link">
            <div className="right-home">
              <h1>
                LES <br /> PERSO-
                <br /> NNAGES
              </h1>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
