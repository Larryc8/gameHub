//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require('axios')

const apikey = '0a2e8de5f89b425a844d4b5ac4ed9c99';

const server = require('./src/app.js');
//const { conn } = require('./src/db.js');
const models = require('./src/db.js');
const config = require('./config.js')

const { conn } = models

// Syncing all the models at once.
conn.sync({ force: true }).then( async () => {
  try{
    const genres =  await axios({// subrutin for keep all genres types
      method: 'get',
      url: `https://api.rawg.io/api/genres?key=${apikey}`
    })
    .then( (genres)=>{
      return genres.data.results
    })

    const genresTypes = genres.map( (genre)=>{
      const {name} = genre
      return {name: name}
    })

    await models.Genre.bulkCreate(genresTypes)

    server.listen(config.SERVER_PORT,  () => {
      console.log(`%s listening at ${config.SERVER_PORT}`); // eslint-disable-line no-console
    });
  }
  catch(error){
    server.listen(config.SERVER_PORT,  () => {
      console.log(`%s listening at ${config.SERVER_PORT}`, error?.message); // eslint-disable-line no-console
    });
  }

});
