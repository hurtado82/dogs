import "../css/Search.css"
import { useRef } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import { TbSearch } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux"
import { getDogs, selectOption, selectOrderBy } from "../redux/actions";

export const chooseTempSelect = (array) => {
  const tempsFinded = [];
  array.map((t) => t.temperament?.split(", ").map((element) => tempsFinded.push(element)));
  const tempFiltered = [...new Set(tempsFinded)];
  return tempFiltered;
};

 export default function Search(props) {
   const refInput = useRef()
   const dispatch = useDispatch();
   const [input, setInput] = useState("");
   const allDogs = useSelector((state) => state.getControl);

   const handleInputChange = (e) => {
      const { value } = e.target;
      setInput(value);
   };

  const handleClick = () => {
    if(refInput.current?.classList.contains("visible")) {
      if (input) {
        dispatch(getDogs(input));
        props.clickOnSearch()
      }
    } 
    refInput.current.classList.toggle("visible")
    setInput("")    
  };

   const handleSelect = (e) => {
     const select = e.target.value;
     dispatch(selectOption(select));
     props.select();
   };

   const handleSelectOrderBy = (e) => {
     const selectOrder = e.target.value;
     dispatch(selectOrderBy(selectOrder));
     props.select();
   };

   return (
     <div className="search-container">
        <Link to={"create"}>
          <button className="btn-create">Create</button>
        </Link>
        <select className="select-filter" onChange={handleSelectOrderBy}>
          <option value={""}>Filter by</option>
          <option value={"a-z"}>a-Z</option>
          <option value={"z-a"}>Z-a</option>
          <option value={"created"}>Created</option>
          <option value={"weightAsc"}>Weight asc</option>
          <option value={"weightDes"}>Weight des</option>
        </select>
        <select id="filter" name="temps-filter" onChange={handleSelect}>
          <option id="opt-temp" value="">Temperament</option>
          {chooseTempSelect(allDogs).map((t, index) => {
            return (
              <option key={index} value={t}>
                {t}
              </option>
            );
          })}
        </select>
       <input
          ref={refInput}
          className={"input-search"}
          id="search"
          type={"text"}
          onChange={handleInputChange}
          value={input}
       />
        <TbSearch onClick={handleClick} className={"icon"} />
      </div>
   );
 }