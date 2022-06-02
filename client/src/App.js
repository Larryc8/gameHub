import {
  Routes,
  Route
} from 'react-router-dom'

import Logging from './components/Logging.js' // path sujeto a cambios buscar en carpeta logging
import Header from './components/Header.js'
import Filter from './components/filtering/Filter.js'
import CardsContainer from './components/videogame/CardsContainer.js'
import Form from './components/create_videogame/Form.js'
import DetailedCard from './components/videogame/DetailedCard.js';
import Notification from  './components/Notification.js';

import './App.css';

function App() {
  return (
    <Routes>
        <Route path='/'element={ <Logging />} />
            <Route path='/home' element={
                <>
                  <Header/>
                  <Filter/>
                  <CardsContainer/>
                </>
            } />
            <Route path='/home/videogames/:gameID' element={<DetailedCard/>}/>
        <Route path='/home/create_videogame' element={<Form />} />
        <Route path='*' element={< Notification msg='PAGE NOT FOUND' redirect={true}/>} />
    </Routes>
  );
}

export default App;
