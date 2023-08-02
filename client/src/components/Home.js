import "../css/Home.css";
import Card from "./Card";
import Header from "./Header";
import Loading from "./Loading";
import { GrNext } from "react-icons/gr"
import { useEffect, useState } from "react";
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
  }, [dispatch, selectOption]);

  const orderBy = (arrayToOrder, order) => {
    let max = Math.max(...control.map((f) => f.id));
    let created = arrayToOrder.filter((c) => c.id > max);
    if (order === "created") {
      arrayToOrder = created;
    }

    let ordered = arrayToOrder.sort((a, b) => {
      let arrfirst = null
      let arrsecond = null
      let a1 = a.name.toLowerCase();
      let b1 = b.name.toLowerCase();
      let arr1 = a.weight.metric?.trim().split("-")[0].trim() || a.weight.trim().split("-")[0].trim();
      let arr2 = b.weight.metric?.trim().split("-")[0].trim() || b.weight.trim().split("-")[0].trim();

      if (arr1 !== isNaN() && arr1 !== undefined && arr1 !== "NaN") arrfirst = arr1
      if (arr2 !== isNaN() && arr2 !== undefined && arr2 !== "NaN") arrsecond = arr2
       
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
            if (Number(arrfirst) < Number(arrsecond)) return -1;
            if (Number(arrfirst) > Number(arrsecond)) return 1;
            return 0;

        case "weightDes":
          if (Number(arrfirst) > Number(arrsecond)) return -1;
          if (Number(arrfirst) < Number(arrsecond)) return 1;
          return 0;

        default: return null
      }
    });
    return ordered;
  };;

  const NUMBER_OF_CARD = 6;
  let numberOfPage = null
  const stopPagination = (array) => {
    let number = Math.ceil(array.length / NUMBER_OF_CARD);
    return number
  }
  
  const filteredDogs = () => {
    if (selectOption) {
      let result = dogs.filter((f) =>
        f.temperament?.toLowerCase().includes(selectOption.toLowerCase())
      );
      console.log(result);
      if (selectOrderBy) { 
        result = orderBy(result, selectOrderBy);
      } 

      numberOfPage = stopPagination(result);
      return result.slice(currentPage, currentPage + NUMBER_OF_CARD);
    }
    if (selectOrderBy) {
      let orderDog = orderBy(dogs, selectOrderBy)
      numberOfPage = stopPagination(orderDog);
      return orderDog.slice(currentPage, currentPage + NUMBER_OF_CARD);
    }
    numberOfPage = stopPagination(dogs);
    return dogs.slice(currentPage, currentPage + NUMBER_OF_CARD);
  }; 

  const select = () => {
      setCurrentPage(0);
      setCounter(1)
    };
  const clickOnSearch = () => {
    setCurrentPage(0);
  }
  const next = () => {
    if (numberOfPage === 0) return
    setCounter(counter + 1);
    console.log(numberOfPage, "counter", counter)
    if (numberOfPage !== counter)
      setCurrentPage(currentPage + NUMBER_OF_CARD);
    else if (counter === numberOfPage) setCounter(numberOfPage);
  };

  const prev = () => {
   if(counter > 1) setCounter(counter - 1);
    console.log(numberOfPage, "counter", counter);
    if(currentPage > 0) setCurrentPage(currentPage - NUMBER_OF_CARD);
  };
  return (
    <div className="main-home">
      <Header select={select}
        clickOnSearch={clickOnSearch}
      />
      <section className="container-cards">
        <GrNext className="btn-right btn-prev-next" onClick={next} />
        <GrNext className="btn-left btn-prev-next" onClick={prev} />
        {dogs.length === 0 ? (
          <Loading />
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
    // </div>
  );
}
