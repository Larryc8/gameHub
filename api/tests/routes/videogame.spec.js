/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
    name: "Zelda",
    description: "juego super interesante",
    released: "2013-09-17",
    rating: 5,
    genre: "Action",
    platform: "PC",
    background_image: "https://media.vandal.net/i/1280x720/4-2020/20204271333472_2.jpg.webp"
}

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /api/videogames', () => {
    it('should get 200', () =>
      agent.get('/api/videogames').expect(200)
    );
  describe('GET /api/videogames', ()=>{
    it('should sign in', function (done) {
      agent.post('/api/videogame')
      .send(videogame)
      .expect(200)
      .end(done);
    });
  })

  });
});
