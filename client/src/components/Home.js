import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../redux/actions";
import { useEffect, useState } from "react";
import Card from "./Card";
import loading from "../images/loading.gif"
import "../css/Home.css"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const dogs = useSelector((state) => state.getAllDogs);
  const inputSearch = useSelector((state) => state.inputSearch);
  const selectOption = useSelector((state) => state.selectOption);
  const dispatch = useDispatch();

  let quantityCard = 8;
  const dogsByPage = dogs.slice(currentPage, currentPage + quantityCard
  );
  
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const next = () => {
    setCurrentPage(currentPage + quantityCard);
  }
  const prev = () => {
    if(currentPage > 0) setCurrentPage(currentPage - quantityCard);
  };
  return (
    <div>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
      <section className="container-cards">
        {dogs.length === 0 ? (
          <img src={loading} alt="Loading" />
        ) : (
          dogsByPage.map((dog) => (
            <Card
              id={dog.id}
              name={dog.name}
              key={dog.id}
              image={dog.image.url}
              weight={dog.weight.metric}
              temperament={dog.temperament}
            />
          ))
        )}
      </section>
    </div>
  );
}
