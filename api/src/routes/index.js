const { Router } = require('express');
const axios = require('axios')


const GAME_CREATED = 201;
const GAME_NOT_FOUND = 404;
const GAME_FOUND =  200;

const models = require('../db.js');
const {Op} = models

const apikey = process.env.API_KEY;

const router = Router();

router.get('/videogames', async (req, res, next)=>{
  const {platforms} = req.query

  if(!platforms) return next();
  try{
    const games =  await axios({// subrutin for keep all genres types
      method: 'get',
      url: `https://api.rawg.io/api/games?key=${apikey}`
    })
    .then( (reponse)=>{
      return reponse.data.results
    })

    const platforms = games.reduce( (platforms, game)=>{
        const platformsArray = game.parent_platforms.reduce( (obj, p)=>{
              const {name} = p.platform
              
              return Object.assign(obj, {[name]: {name}})
          }, {})
      return Object.assign(platforms, platformsArray)
    }, {})

    // await models.Genre.bulkCreate(genresTypes)
    res.json(Object.values(platforms));
  }
  catch(error){
    res.status(404).json(error?.message)
  }
})

router.get('/videogames', async (req, res, next) =>{
  const {name} = req.query
  if (!name) return next();

  try {
      let game;
      let gameAPI;

       games = await models.Videogame.findAll({
        attributes: ["id", "name", "background_image",  "rating"],
        where: {
          name: {[Op.iLike]: `%${name}%`}
        },
        include: [
          {model: models.Genre, through: {attributes: []}}
        ]
      });

      gameAPI = await axios({
         method: 'get',
         url: `https://api.rawg.io/api/games?search=${name}&&key=${apikey}`
       }).then( (reponse)=>reponse.data.results).then( (results)=>{
         return results.map( (game)=>{
           const {id, name, background_image, genres, rating} = game
           return {id, name, background_image, genres, rating}
         })
       });
      res.json(games.concat(gameAPI))
  }

  catch (error) {
    res.status(GAME_NOT_FOUND).json(error)
  }

})

router.get('/videogames', async (req, res, next) => {
  var allGames = [ ]

  try{
    const {filterby} = req.query // si filterby es unndefined esntra a ambos if

    if(filterby !== 'created'){

      let videogamesPages = [];
      for (let pageNumber = 1; pageNumber < 6; pageNumber++) {
        const page = axios.get(`https://api.rawg.io/api/games?key=${apikey}&page=${pageNumber}`);
        videogamesPages = videogamesPages.concat(page);
      }
      const apiGames = await Promise.all(videogamesPages)
      .then(response =>{
        const results = response.reduce( (videogames, data) => videogames.concat(data.data.results), []);
        return results
      })
      .then( (results)=>{
        return results.map( (game)=>{
          const {id, name, background_image, genres, rating} = game
          return {id, name, background_image, genres, rating}
        })
      });

      allGames = allGames.concat(apiGames? apiGames: [])
    }

    if(filterby !== 'instock'){
      const dbGames = await models.Videogame.findAll({
        include: [
          {model: models.Genre, through: {attributes: []}},
          {model: models.Platform, through: {attributes: []}}
        ]
      }).then( (results)=>{
        return results.map( (game)=>{
          const {id, name, background_image, genres, rating} = game
          return {id, name, background_image, genres, rating}
        })
      });

      allGames = allGames.concat(dbGames? dbGames : [] )
    }

    res.json(allGames)
  }
  catch(error){
    res.status(404).json(error?.message)
  }
});

router.get('/videogames/:gameID',  async (req, res, next) => {
  try{
    const {gameID} = req.params

    const dbGame = await models.Videogame.findOne({
      where: {
        id: gameID
      },
      include: [
        {model: models.Platform, through: {attributes: []}},
        {model: models.Genre, through: {attributes: []}}
      ]
    })
    console.log('GET gameID', dbGame);

    res.json(dbGame)
  }
  catch{
      try{
        const {gameID} = req.params
        const {
              name,
              description_raw,
              released,
              genres,
              parent_platforms,
              id,
              background_image,
              rating
           }  = await axios({
            method: 'get',
            url: `https://api.rawg.io/api/games/${gameID}?key=${apikey}`
          }).then((game)=>{
            return game.data
          })

      const platforms = parent_platforms.map( (platform)=>({...platform.platform}))

        res.json({
          name,
          description: description_raw,
          released,
          genres,
          platforms,
          id,
          background_image,
          rating
        })
      }
      catch(error){
          res.status(404).json(error?.message)
      }
  }
});

//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//Crea un videojuego en la base de dato
router.post('/videogames', async (req, res, next) => {
  try{
    const {name,
      description,
      released,
      rating,
      genres,
      platforms,
      background_image } = req.body

    const newVideogame = await models.Videogame.create({
      name, description, released, rating, background_image
    })


    const _genres = genres.map( async (genre)=>{
      return models.Genre.findOrCreate({defaults: genre, where:  genre })
    })

    const _platforms = platforms.map( async (platform)=>{
      return models.Platform.findOrCreate({defaults: platform, where: platform})
    })

    const genresToAdd = await Promise.all(_genres)
    const platformsToAdd = await Promise.all(_platforms)

    await newVideogame.setGenres( genresToAdd.map( (pair)=> pair[0]));//warninng
    await newVideogame.setPlatforms( platformsToAdd.map( (pair)=> pair[0]));//warnig


    res.status(GAME_CREATED).json(newVideogame)
  }
  catch(error){
    res.status(400).json(error)
  }
});

router.get('/genres', async (req, res, next) => {
  try{
    const genresTypes = await models.Genre.findAll()
    res.json(genresTypes)
  }
  catch(error){
    res.status(404).json(error?.message)
  }
})

router.get('/admin', (req, res, next)=>{
  res.json( "WELLCOME TO THE ADMIN ROUTE")
})

router.use('*', (req, res, next) => {
  res.json("THIS ROUTE DOESNT EXIST")
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
