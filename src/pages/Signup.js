import axios from "axios";
import logo from "../img/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://site--backend-marvel--2dm7g26jk8pz.code.run/signup?username=${username}&email=${email}&password=${password}&newsletter=${newsLetter}`,
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsLetter,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte chez nous !");
      }
      console.log(error.message);
    }
  };

  return (
    <div>
      <header>
        <Link to="/">
          <img className="logoSignup" src={logo} alt="logo marvel" />
        </Link>
        <div className="button"></div>
      </header>

      <div className="signup-container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          className="signup-form"
        >
          <input
            value={username}
            onChange={(event) => {
              event.preventDefault();
              setUsername(event.target.value);
            }}
            placeholder="Nom d'utilisateur"
            type="text"
          />
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
            placeholder="Email"
            type="email"
          />
          <span className="signup-login-error-message">{errorMessage}</span>
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Mot de passe"
            type="password"
          />
          <div className="checkbox-container">
            <div>
              <input
                type="checkbox"
                checked={newsLetter}
                onChange={() => {
                  setNewsLetter(!newsLetter);
                }}
              />
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Marvel. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <button type="submit">S'inscrire</button>
          <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
