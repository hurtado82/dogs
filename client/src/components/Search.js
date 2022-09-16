 import { useState } from "react"
 import { useDispatch, useSelector } from "react-redux"
 import { getDogs, inputSearch, selectOption } from "../redux/actions";

 export default function Search() {
  const [ input, setInput ] = useState("")
  const [selectOptionState, setSelectOptionState] = useState("");
  const filters = useSelector((state) => state.getAllDogs);

  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    const { value } = e.target
    setInput(value);
     dispatch(inputSearch(input));
  }
  
  const handleClick = () => {
    if (!selectOptionState || selectOptionState === "name") {
      dispatch(getDogs(input));
    } else if (input) {
      const result = filters.filter(
        (f) => f[selectOptionState]?.toLowerCase().includes(input) === true
      );
      console.log(result);
    }
  }
   const handleSelect = (e) => {
    const select = e.target.value
    dispatch(selectOption(select));
    setSelectOptionState(select);
    console.log(selectOptionState);
  }
  return (
    <div>
      <select id="filter" name="filter" onChange={handleSelect}>
        <option value="">Select</option>
        <option value={"temperament"}>Temperament</option>
        <option value={"name"}>Breed</option>
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