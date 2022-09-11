import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../redux/actions";
import { useEffect } from "react";
import Card from "./Card";

export default function Home() {
  const DOGS = useSelector((state) => state.getAllDogs);
  const DISPATCH = useDispatch();

  useEffect(() => {
    console.log("entro useEffect");
    DISPATCH(getDogs());
  }, [DISPATCH]);

  return (
    <div>
      <p>sholslfjslh</p>
      <div></div>
      {DOGS.map((dog) => (
        <Card
          name={dog.name}
          key={dog.id}
          image={dog.image.url} />
        
      ))}
    </div>
  );
}
