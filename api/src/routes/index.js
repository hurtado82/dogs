const { Router } = require('express');
const axios = require("axios") 
const { Breed , Dog, Temperament}  = require("../db.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const breedsByName = (breed) => {
 return breed.map((b) => b.name);
}

router.get("/dogs", (req, res) => {
  const {name} = req.query;
  console.log(name)
  axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((data) => data.data)
    .then((breeds) => {
      if (name) {
        const nameSearch = breeds.filter( (b) => b.name.toLowerCase().startsWith(name.toLowerCase()) === true );
        if (!nameSearch.length) return res.status(404).send("Breed no found");
        else res.status(200).send(nameSearch);
        
      } else {
        // const breedName = breedsByName(breeds);
        res.status(200).send(breeds);
      }
    });
});

router.get("/dogs/:id",(req, res) => {
  const { id } = req.params
  console.log(id)
  axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)
    .then((data) => data.data)
    .then((breeds) => {
  res.status(200).send(breeds)
    })
})

router.post("/dogs", async (req, res) => {
 const body = req.body
 console.log(body)
 try {
   const newBreed = await Breed.create(body)
   res.status(201).send(newBreed);
 }
 catch(error) {
   res.status(404).send(error)
 }
})

router.get("/temperaments", (req, res) => {
  axios.get("https://api.thedogapi.com/v1/breeds")
  .then(res => res.data)
  .then(temps => {
    let tempsFound = temps.map(t => t.temperament)
    res.status(200).send(tempsFound);
  })
})

module.exports = router;
