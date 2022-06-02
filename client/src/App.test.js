import App from './App';
import Card from './components/videogame/Card.js'
import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

const game = {
    id: 1222,
    name: "Zelda",
    description: "juego super interesante",
    released: "2013-09-17",
    rating: 5,
    genre: "Action",
    platform: "PC",
    background_image: "https://media.vandal.net/i/1280x720/4-2020/20204271333472_2.jpg.webp"
}


test('loads and displays videogame Card', async () => {
  render(<Card
    key={game.id}
    id={game.id}
    name={game.name}
    background_image={game.background_image}
    genres={game.genres}
    rating={game.rating}
  />);

  expect(screen.getByRole('img'))

  expect(screen.getByRole('span')).toHaveTextContent(game.name)

})
