import "../css/Home.css";
import Card from "./Card";
import Header from "./Header";
import loading from "../images/loading.gif";
import { getDogs } from "../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const dogs = useSelector((state) => state.getAllDogs);
  const selectOption = useSelector((state) => state.selectOption);

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  let numberOfPage = null;
  const NUMBER_OF_CARD = 8;
  const filteredDogs = () => {
    if (selectOption) {
      const result = dogs.filter((f) => f.temperament?.includes(selectOption));
      if(result.length >= NUMBER_OF_CARD) {
        numberOfPage = Math.floor(result.length / NUMBER_OF_CARD) 
      }
      console.log(result, Math.floor( numberOfPage ));
      return result.slice(currentPage, currentPage + NUMBER_OF_CARD);
    }
    return dogs.slice(currentPage, currentPage + NUMBER_OF_CARD);
  }; 

  const select = () => {
      setCurrentPage(0);
    };
  const clickOnSearch = () => {
    setCurrentPage(0);
    console.log("se hizo click");
  }
  const next = () => {
    setCounter(counter + 1);
    console.log(currentPage, filteredDogs().length);
    if (filteredDogs().length === 8)
      setCurrentPage(currentPage + NUMBER_OF_CARD);
    else if (counter === numberOfPage) setCounter(0);
    console.log(currentPage, numberOfPage);
  };
  const prev = () => {
    if(currentPage > 0) setCurrentPage(currentPage - NUMBER_OF_CARD);
  };
  return (
    <div>
      <Header select={select}
      clickOnSearch={clickOnSearch} />
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
      <section className="container-cards">
        {dogs.length === 0 ? (
          <img src={loading} alt="Loading" />
          ) : (
                filteredDogs()?.map((dog) => (
                  <Card
                    id={dog.id}
                    name={dog.name}
                    key={dog.id}
                    image={dog.image.url}
                    weight={dog.weight.metric}
                    temperament={dog.temperament}
                  />
                ))
              )
        }
      </section>
    </div>
  );
}
