import "../css/Card.css"
import { Link } from "react-router-dom";

export default function Card({ id, name, image, weight, temperament, height, age}) {
  
  return (
    <div>
      <div className="card-box">
        <Link to={`/dogs/${id}`}>
          <h4>{name}</h4>
          <img src={image} width="336" height={200} alt={name} />
          <div>Weight: {weight}</div>
          <div className="temperament">Temperament: {temperament}</div>
          <div>{height}</div>
          <div>{age}</div>
        </Link>
      </div>
    </div>
  );
}
