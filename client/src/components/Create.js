import "../css/Create.css"
import { useState } from "react"

export default function Create() {
  const [input, setInput] = useState({
    age: "",
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    temperament: "",
  });
  const { name, heightMin, heightMax, weightMin, weightMax, age, temperament } = input
  const handleSubmit = (e) => {
    e.preventDefault()
    
    fetch("http://localhost:3001/dogs", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        height: heightMin,
        weight: `${weightMin} - ${weightMax}`,
        age: age,
        temperament: temperament,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    console.log(input)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value
    })
    console.log(input);
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <div className="container-form">
          <label className="label-form" name="name">
            <span className="label-span">Name: </span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </label>

          <label className="label-form" name="heightMin">
            <span className="label-span">Height min: </span>
            <input
              type="text"
              name="heightMin"
              value={heightMin}
              onChange={handleInputChange}
            />
          </label>

          <label className="label-form" name="heightMax">
            <span className="label-span">Height max: </span>
            <input
              type="text"
              name="heightMax"
              value={heightMax}
              onChange={handleInputChange}
            />
          </label>

          <label className="label-form" name="weightMin">
            <span className="label-span">Weight min: </span>
            <input
              type="text"
              name="weightMin"
              value={weightMax}
              onChange={handleInputChange}
            />
          </label>

          <label className="label-form" name="weightMax">
            <span className="label-span">Weight max: </span>
            <input
            type="text"
            name="weightMax"
            value={weightMax}
            onChange={handleInputChange} />
          </label>

          <label className="label-form" name="age">
            <span className="label-span">Age: </span>
            <input
              type="text"
              name="age"
              value={age}
              onChange={handleInputChange}
            />
          </label>

          <select className="label-form" multiple={true}>
            <option value="alho">Temperament</option>
            <option value="alho">playful</option>
            <option value="alho">pl</option>
            <option value="alho">pful</option>
          </select>
          <input
            type="text"
            name="temperament"
            value={temperament}
            onChange={handleInputChange}
          />
          <input type="submit" value={"Create"} />
        </div>
      </form>
    </div>
  );
}