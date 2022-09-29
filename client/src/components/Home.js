import "../css/Home.css";
import Card from "./Card";
import Header from "./Header";
import { useEffect, useState } from "react";
import loading from "../images/loading.gif";
import defaultDog from "../images/default.jpg";
import { getControl, getDogs } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const dogs = useSelector((state) => state.getAllDogs);
  const control = useSelector((state) => state.getControl);
  const selectOption = useSelector((state) => state.selectOption);
  const selectOrderBy = useSelector((state) => state.selectOrderBy);


  useEffect(() => {
    dispatch(getDogs());
    dispatch(getControl());
  }, []);

  const orderBy = (arrayToOrder, order) => {
    let max = Math.max(...control.map((f) => f.id));
    let created = arrayToOrder.filter((c) => c.id > max);
    if(order === "created") {
      arrayToOrder = created
    }

      let ordered = arrayToOrder.sort((a, b) => {
        let a1 = a.name.toLowerCase();
        let b1 = b.name.toLowerCase();
        let arr1 = a.weight.metric?.trim().split("-")[0];
        let arr2 = b.weight.metric?.trim().split("-")[0];
        switch (order) {
          case "a-z":
            if (a1 < b1) return -1;
            if (a1 > b1) return 1;
            return 0;

          case "z-a":
            if (a1 > b1) return -1;
            if (a1 < b1) return 1;
            return 0;

          case "weightAsc":
            if (arr1 < arr2) return -1;
            if (arr1 > arr2) return 1;
            return 0;

          case "weightDes":
            if (arr1 > arr2) return -1;
            if (arr1 < arr2) return 1;
            return 0;

          default:           
        }
      });  
      return ordered  
  };

  let numberOfPage = null;
  const NUMBER_OF_CARD = 8;
  const filteredDogs = () => {
    if (selectOption) {
      const result = dogs.filter((f) =>
        f.temperament?.toLowerCase().includes(selectOption.toLowerCase())
      );
      console.log(result)
      // if(result.length >= NUMBER_OF_CARD) {
      //   numberOfPage = Math.floor(result.length / NUMBER_OF_CARD) 
      // }
      return result.slice(currentPage, currentPage + NUMBER_OF_CARD);
    }
    if (selectOrderBy) {
      let orderDog = orderBy(dogs, selectOrderBy)
       return orderDog.slice(currentPage, currentPage + NUMBER_OF_CARD);
    }
      return dogs.slice(currentPage, currentPage + NUMBER_OF_CARD);
  }; 

  const select = () => {
      setCurrentPage(0);
    };
  const clickOnSearch = () => {
    setCurrentPage(0);
  }
  const next = () => {
    setCounter(counter + 1);
    if (filteredDogs().length === NUMBER_OF_CARD)
      setCurrentPage(currentPage + NUMBER_OF_CARD);
    else if (counter === numberOfPage) setCounter(0);
  };

  const prev = () => {
    if(currentPage > 0) setCurrentPage(currentPage - NUMBER_OF_CARD);
  };
  return (
    <div>
      <Header select={select}
        clickOnSearch={clickOnSearch}
      />
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
                    image={dog.image?.url || defaultDog}
                    weight={dog.weight.metric || dog.weight}
                    temperament={dog.temperament}
                  />
                ))
              )
        }
      </section>
    </div>
  );
}
