import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../redux/actions";
import { useEffect } from "react";
import Card from "./Card";
// import { Link } from "react-router-dom";

export default function Home() {
  const DOGS = useSelector((state) => state.getAllDogs);
  const DISPATCH = useDispatch();

  useEffect(() => {
    console.log("entro useEffect");
    DISPATCH(getDogs());
  }, [DISPATCH]);
  
  return (
    <div>
      <div></div>
      {DOGS.length === 0 ? <h2>Loading...</h2> : DOGS.map((dog) => (
          <Card
            id={dog.id}
            name={dog.name}
            key={dog.id}
            image={dog.image.url}
            weight={dog.weight.metric}
            temperament={dog.temperament} />
      ))}
    </div>
  );
}
