import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';

import {
  getAllGames,
  selectMyGames,
  setGameAdded,
  filterByGenre,
  moveToNextPage,
  moveToPrevPage,
  setPageIndex
} from '../../actions/index.js'
import {selectGamesByFilters} from '../../reducers/selectors.js'

import Card from './Card.js'
import NavIndexes from '../navigation/NavIndexes.js'
import NavButtonArrow from '../navigation/NavButtonArrow.js'
import Loading from '../Loading.js'
import Footer from '../Footer.js'

import style from './CardsContainer.module.css'
import reload from '../images/curved-arrow.svg'
import cat from '../images/pixel-cat.png'
import forest from '../images/forest.svg'


const Notification = () =>{
  const dispatch = useDispatch()
  const handleClick = ()=>{
    dispatch(selectMyGames())
    dispatch(setPageIndex(0))
    dispatch(setGameAdded(false))
    dispatch(filterByGenre('All'))
  }
  return (
    <div className={style.notification}>
      <span onClick={handleClick}><span>⟲</span> new games were added</span>
    </div>
  )
}

const GameNotFound = ({msg})=>{
  const dispatch = useDispatch()

  const styleContainer =  {
    position: 'absolute',
    left: '50%',
    transform: "translate(-50%, 100px)",
    background: '#fff',
    padding: '20px',
    boxShadow: '0 5px 50px rgba(0,0,0, .4)'
  }

  return (
    <div style={styleContainer}>
      <h1>VIDEOGAME NOT FOUND</h1>
      <img src={forest} />
      <p style={{fontSize: "18px"}}>{msg}</p>
      <span
          className={style.buttonPrimary}
          onClick={ ()=>{
            dispatch(getAllGames())
            dispatch(filterByGenre('All'))
          }}
        >Go home</span>
    </div>
  )
}

const CardsContainer = ()=>{
  const dispatch = useDispatch()

  //const games = useSelector( state =>state.games.filteredGames)
  const games = useSelector( selectGamesByFilters)
  const available  = useSelector( state=>state.games.available)
  const wasNotFound  = useSelector( state=>state.games.wasNotFound)
  const newGameWasAdded = useSelector( state=>state.games.newGameWasAdded)
  const {pageIndex, pageSliceSize} = useSelector( state=>state.games)
  const selectedGames = useSelector( state=>state.games.games);
  const genreFilter = useSelector( (state)=>state.games.genreFilter)


  useEffect( ()=>{
    if(!games.length) {
      dispatch(getAllGames());
    }
  }, [])

    return(
    <>
      <span style={{
        position: 'relative',
        zIndex: '3',
        left: '3%',
        top: "60px",
        padding: "10px 20px",
        background: "#fff",
        fontSize: "30px",
        fontWeight: "900"
      }}
      >{selectedGames}</span>

      {
        !available? <Loading />:
        wasNotFound? <GameNotFound msg='The game(s) that you are looking for dont exist'/> :
        !games.length? <GameNotFound msg={`It seems like dont exist games with ${genreFilter} genre, try filter by another genre`} />:
          <div>
              {newGameWasAdded? <Notification />: null}

              <NavButtonArrow name='Prev' action={moveToPrevPage} pageSize={games.length} className={style.buttonLeft}/>
              <NavButtonArrow name='Next' action={moveToNextPage} pageSize={games.length} className={style.buttonRight}/>
              <div className={style.container}>
                  {
                    games?.slice( (pageSliceSize*pageIndex), pageSliceSize*(pageIndex +1) ).map( (game, index)=> <Card
                      key={game.id}
                      id={game.id}
                      name={game.name}
                      background_image={game.background_image}
                      genres={game.genres}
                      rating={game.rating}
                    />)
                  }
              </div>
              <div className={style.navItemsPosition} >
                <NavIndexes pageSize={games.length} />
              </div>
              <Footer />
          </div>
    }
    </>
    )

}

export default CardsContainer;
