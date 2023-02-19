import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({
  handleFavorites,
  image,
  link,
  name,
  type,
  id,
  description,
}) => {
  return (
    <>
      <div className="heroes-container">
        {link ? (
          <Link to={link}>
            <figure>
              <img className="hero-images" src={image} alt="hero images" />
              <FontAwesomeIcon
                className="heart-plus-icon-characters"
                icon="heart-circle-plus"
                onClick={(event) => {
                  event.preventDefault();
                  handleFavorites({
                    image: image,
                    name: name,
                    type: type,
                    id: id,
                  });
                }}
              />
            </figure>
          </Link>
        ) : (
          <figure>
            <img className="hero-images" src={image} alt="hero images" />
            <FontAwesomeIcon
              className="heart-plus-icon"
              icon="heart-circle-plus"
              onClick={(event) => {
                event.preventDefault();
                handleFavorites({
                  image: image,
                  name: name,
                  type: type,
                  id: id,
                });
              }}
            />
          </figure>
        )}

        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </>
  );
};
export default Card;
