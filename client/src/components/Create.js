import "../css/Create.css"
import { useState } from "react"
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
      (name === "weightMin" && value.length > 4) ||
      (name === "weightMax" && value.length > 4) ||
      (name === "heightMin" && value.length > 4) ||
      (name === "heightMax" && value.length > 4) ||
      (name === "age" && value.length > 4)
    ) return; 
    
    let expresion = /^[a-zA-Z ]*$/;
    let warningName = document.getElementById("warning")
    let warning = document.getElementById("input-name-id")
    if(name === "name" && !expresion.test(value)){
      warningName.innerHTML = "Numbers and symbols not allowed";
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

  const handleClick = (e) =>{
    e.preventDefault(e);
    input.temperament = ""
    setSelectTemps("")
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="container-form">
            <div className="contain-input-name">
              <label className="label-form-name" name="name">
                <span className="label-span-name">Name: </span>
                <input
                  id="input-name-id"
                  className="input-name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
                <div id="warning"></div>
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
              placeholder = "Choose 1 or several temperaments"
              onChange={handleInputChange}
            />
            <button onClick={handleClick}>Clear</button>
          </div>
          <input type="submit" value={"Create"} />
        </div>
        <div id="required" className="class-required"></div>
      </form>
    </div>
  );
}