const axios = require("axios") 
const { Router } = require('express');
const { Breed , Dog, Temperament}  = require("../db.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getDataBase = async ()=>{
  const allDb = await Breed.findAll({
    include: {
      model: Temperament,
    },
  }); 
  return allDb
}

const organizationArray = (array, lengthArray) => {
  let dogDb = [];
  array?.map(dog => {
    let { id, name, height, weight, age, temperaments } = dog;
    let temperament = temperaments[0].dataValues.name;
    id = Math.max(...lengthArray.map((f) => f.id)) + id;
    dogDb.push( { id, name, height, weight, age, temperament } )
  })  
  return dogDb
}

//-------------------------------routes-------------------------------------
//busqueda dogs y dogs + query 
router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  let arrayFromDb = await getDataBase();
  axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((data) => data.data)
    .then((breeds) => {
      try {
        if (name) {
          const nameSearch = breeds.filter(
            (b) => b.name.toLowerCase().includes(name.toLowerCase()) === true
          );
          if (!nameSearch.length) return res.status(404).send("Breed no found");
          else res.status(200).send(nameSearch);

        } else {
          let breedsDb = organizationArray(arrayFromDb, breeds);
          return res.status(200).send([...breeds, ...breedsDb]);
        }
    }catch(error) {
      res.sendStatus().send(error)
    }
  });
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params
  let arrayFromDbId = await getDataBase();
  const filterById = (array, ID) => {
    const search = array.filter((b) => b.id === parseInt(ID));
    let searchFound = search[0];
    return searchFound
  }
  try {
    axios.get("https://api.thedogapi.com/v1/breeds")
    .then((data) => data.data)
    .then((breeds) => {
      let arrayReady = organizationArray(arrayFromDbId, breeds)
      let mixingArrays = [...breeds, ...arrayReady]
      let filtered = filterById(mixingArrays, id);
      filtered
        ? res.status(200).send(filtered)
        : res.status(404).send("no found");
    })
  }catch(error) {
    res.sendStatus().send(error)
  }
})

router.post("/dogs", async (req, res) => {
 const body = req.body
 const { temperament } = body
 console.log(body)
 
 try {
   const newTemperament = await Temperament.create({ name: temperament })
   const newBreed = await Breed.create(body)
   newBreed.addTemperament(newTemperament);
   res.status(201).send(newBreed);
 }
 catch(error) {
   res.status(404).send(error)
 }
})

router.get("/temperaments", (req, res) => {
  try {
    axios.get("https://api.thedogapi.com/v1/breeds")
    .then(res => res.data)
    .then(temps => {
      let tempsFound = [];
      let filtered;
      temps.map((t, i) =>
        t.temperament?.split(",").map((element) => tempsFound.push(element)) );
      filtered = [...new Set(tempsFound)]
      console.log("fjf",filtered.length);
      res.status(200).send(filtered);
    })
  } catch(error) {
    res.sendStatus().send(error);
  }
})
//----------------test only-----------------------------

router.post("/test", async(req, res) => {  
  const { temperament } = req.body
  const body = req.body
  if (Array.isArray(body)) {
  const algo = body.map((t) => (t.temperament = { name: temperament }));
  const temp = await Temperament.bulkCreate(algo);
  const newBreed = await Breed.bulkCreate(body);
  newBreed.addTemperaments(temp); 
  res.status(201).send(newBreed);
}

  const temp =await Temperament.create({ name: temperament });
  const newBreed = await Breed.create(body)
  newBreed.addTemperament(temp)
  res.status(201). send(newBreed)
})

router.get("/test", async(req, res) => {
  const findB = await Breed.findAll({
    include:[{
      model: Temperament,
      attributes: ["name"]
    }] 
  })
  res.status(200).send(findB);
})
//------------------------end test-------------------------------------

module.exports = router;
