import { Link } from "react-router-dom";

export default function Card({ id, name, image, weight, temperament, height, age}) {
  return (
    <div>
       <Link to={`/dogs/${id}`}>
        <div>Name: {name}</div>
        <div>Weight: {weight}</div>
        <div>Temperament: {temperament}</div>
        <div>{height}</div>
        <div>{age}</div>
        <img src={image} width="300" alt={name}/>
      </Link>
    </div>
  );
}
