import "../css/Create.css"
import { useState } from "react"
import ButtonBack from "./ButtonBack";
import { useSelector } from "react-redux";
import { chooseTempSelect } from "./Search"


export default function Create() {
  const initialState = {
    age: "",
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    temperament: "",
  };
  const temps = useSelector((state) => state.getAllDogs);
 
  const [selectTemps, setSelectTemps] = useState("");
  const [input, setInput] = useState(initialState);
  const { name, heightMin, heightMax, weightMin, weightMax, age, temperament } = input
  const expresion = /^[a-zA-Z ]*$/;

  const handleSubmit = (e) => {
    e.preventDefault()    

    let warningRequired = document.getElementById("required")
    if (!name || !heightMin || !heightMax || !weightMin || !weightMax || !age || !temperament) {
      return (warningRequired.innerHTML = "All fields are required");
    } 

    if (heightMin && heightMax && Number(weightMin) > Number(weightMax)) return alert("Weight: max no puede ser menor a min");
      
    if (weightMin && weightMax && Number(heightMin) > Number(heightMax))
      return alert("Height: max no puede ser menor a min");
  
    fetch("http://localhost:3001/dogs", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        height: `${heightMin} - ${heightMax}`,
        weight: `${weightMin} - ${weightMax}`,
        age: age,
        temperament: input.temperament,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        warningRequired.className = "class-created"
        warningRequired.innerHTML = "Created"
        console.log(result)
      })
      
      setInput(initialState);
      setSelectTemps("")
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (
      (name === "weightMin" && value.length > 3) ||
      (name === "weightMax" && value.length > 3) ||
      (name === "heightMin" && value.length > 3) ||
      (name === "heightMax" && value.length > 3) ||
      (name === "age" && value.length > 2)
    ) return; 
    
    let warningName = document.getElementById("warning")
    let warning = document.getElementById("input-name-id")
    if(name === "name" && !expresion.test(value)){
      warningName.innerHTML = "Numbers and symbols are not allowed";
      warning.style.borderColor = "red"
      warning.style.color = "red"
    } else {
      warningName.innerHTML = null
      warning.style.borderColor = "black";
      warning.style.color = "black";
    }

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSelect = (e) => {
    let { value } = e.target
    if (input.temperament.includes(value) && value !== "") return console.log("repetido", value)
    if(value === "") return
    value = value + ", " + selectTemps;
    setSelectTemps(value)
    input.temperament = value
    console.log("temp", input.temperament)
    
  }

  const handleClick = (e) => {
    e.preventDefault(e);
    input.temperament = ""
    setSelectTemps("")
  }

  const handleBlur = (e) => {
    if(!expresion.test(e.target.value)) e.target.value = ""
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="container-form">
            <div id="warning"></div>
            <div className="w-and-h-form">
              <label className="label-form-name" name="name">
                <span className="label-span-name title">Name </span>
                <input
                  id="input-name-id"
                  className="input-name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  autoComplete={"off"}
                />
              </label>
            </div>

            <div className="w-and-h-form">
              <span className="title">Height</span>
              <label className="label-form" name="heightMin">
                <span className="label-span">Min: </span>
                <input
                  className="input"
                  type="number"
                  name="heightMin"
                  value={heightMin}
                  onChange={handleInputChange}
                  autoComplete={"off"}
                />
              </label>

              <label className="label-form" name="heightMax">
                <span className="label-span">Max: </span>
                <input
                  className="input"
                  type="number"
                  name="heightMax"
                  value={heightMax}
                  onChange={handleInputChange}
                  autoComplete={"off"}
                />
              </label>
            </div>

            <div className="w-and-h-form">
              <span className="title">Weight</span>
              <label className="label-form" name="weightMin">
                <span className="label-span">Min: </span>
                <input
                  className="input"
                  type="number"
                  name="weightMin"
                  value={weightMin}
                  onChange={handleInputChange}
                  autoComplete={"off"}
                />
              </label>

              <label className="label-form" name="weightMax">
                <span className="label-span">Max: </span>
                <input
                  className="input"
                  type="number"
                  name="weightMax"
                  value={weightMax}
                  onChange={handleInputChange}
                  autoComplete={"off"}
                />
              </label>
            </div>
          </div>

          <div className="temperament-form">
            <select className="select-form" onChange={handleSelect}>
              <option value={""} >Temperament</option>
              {chooseTempSelect(temps).map((t, index) => {
                return (
                  <option key={index} value={t}>
                    {t}
                  </option>
                );
              })}
            </select>

            <label className="age" name="age">
              <span className="label-span">Age: </span>
              <input
                className="input"
                type="number"
                name="age"
                value={age}
                onChange={handleInputChange}
                autoComplete={"off"}
              />
            </label>
          </div>
          <div className="text-area-form">
            <textarea
              rows="6"
              cols="30"
              readOnly
              type="text"
              name="temperament"
              value={input.temperament}
              placeholder = "Choose temperaments"
              onChange={handleInputChange}
            />
            <button onClick={handleClick}>Clear</button>
          </div>
          <input type="submit" value={"Create"} className={"btn-create"}/>
        </div>
        <div id="required" className="class-required"></div>
      </form>
      <ButtonBack />
    </div>
  );
}