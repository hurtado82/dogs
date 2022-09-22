 import { useState } from "react"
 import { useDispatch, useSelector } from "react-redux"
 import { getDogs, selectOption } from "../redux/actions";

 export default function Search(props) {
   const [input, setInput] = useState("");
   const allDogs = useSelector((state) => state.getAllDogs);

   const dispatch = useDispatch();

   const handleInputChange = (e) => {
     const { value } = e.target;
     setInput(value);
   };

  const handleClick = () => {
     let numberOfClick = 0
    if (input) {
      dispatch(getDogs(input));
      props.clickOnSearch()
      numberOfClick++
    } 
    setInput("")
    if(numberOfClick > 1) {
      setTimeout(() => dispatch(getDogs()), 2000);
      numberOfClick = 0;
    }
    
  };

   const handleSelect = (e) => {
     const select = e.target.value;
     dispatch(selectOption(select));
     props.select(select);
   };
   const tempsFound = [];
   allDogs.map((t) =>
     t.temperament?.split(",").map((element) => tempsFound.push(element))
   );
   const tempFiltered = [...new Set(tempsFound)];
   return (
     <div>
       <select disabled>
         <option>Filter by</option>
         <option>a-z</option>
         <option>z-a</option>
         <option>Weight</option>
       </select>
       <select id="filter" name="filter" onChange={handleSelect}>
         <option value="">Temperament</option>
         {tempFiltered.map((t, index) => {
           return (
             <option key={index} value={t}>
               {t}
             </option>
           );
         })}
       </select>
       <input
         id="search"
         type={"text"}
         onChange={handleInputChange}
         value={input}
       />
       <button onClick={handleClick}>Search</button>
     </div>
   );
 }