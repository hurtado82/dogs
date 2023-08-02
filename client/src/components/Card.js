import "../css/Card.css"
import { Link } from "react-router-dom";

export default function Card({ id, name, image, weight, temperament, height, age}) {
  return (
    <div className="container-card">
      <div className="card-box" >
          <Link to={`/dogs/${id}`} className = "link">
              <h4 className="name-card">{name}</h4>
              <img src={image} alt={name} className="img" />
              <div className="contain">
                <div className="data">Weight: {weight}</div>
                <div className="temperament">
                  Temperament: {temperament}
                </div>
              </div>
          </Link>
          <div className="data">{height}</div>
      </div>
    </div>
  );
}
