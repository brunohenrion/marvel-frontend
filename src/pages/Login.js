import axios from "axios";
import logo from "../img/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://site--backend-marvel--2dm7g26jk8pz.code.run/login?email=${email}&password=${password}`,
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
      console.log(error.message);
    }
  };

  return (
    <div>
      <header>
        <Link to="/">
          <img className="logoLogin" src={logo} alt="logo marvel" />
        </Link>
        <div className="button"></div>
      </header>
      <div className="login-container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          className="signup-form"
        >
          <input
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
            placeholder="Adresse email"
            type="email"
          />
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Mot de passe"
            type="password"
          />
          <span className="signup-login-error-message">{errorMessage}</span>

          <button type="submit">Connecte toi !</button>
          <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
