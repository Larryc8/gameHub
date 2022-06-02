import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'

import DropDownMenu from './DropDownMenu.js'

import style from './Filter.module.css'

import {
  getAllGenres,
  filterByGenre,
  orderBy,
  setOrderType,
  selectGames
} from '../../actions/index.js'

const Filter = ()=>{
  const genres = useSelector( (state)=>{
    const genres = state.genres.slice()
    genres.unshift({name: 'All'})
    return genres
  })

  const {genreFilter, orderByProp, ordering, games} = useSelector( (state)=>state.games)
  const dispatch = useDispatch()

  useEffect( ()=>{
    if(genres.length < 2)dispatch(getAllGenres())
  }, [])


  return(
    <div className={style.container}>
      <DropDownMenu filterAction={filterByGenre} name='genre' options={genres} currentSelection={genreFilter}/>
      <DropDownMenu  filterAction={selectGames} name='games' options={[{name: 'All'}, {name: 'My games'}, {name: 'Others'}]} currentSelection={games}/>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '15px'
        }}
      >
        <DropDownMenu  filterAction={orderBy} name='property' options={[{name: 'rating'}, {name: 'name'}]} currentSelection={orderByProp}/>
        <DropDownMenu  filterAction={setOrderType} name='ordering' options={[{name: 'descendent'}, {name: 'ascendent'}]} currentSelection={ordering}/>
      </div>
    </div>
  )
}

export default Filter;
