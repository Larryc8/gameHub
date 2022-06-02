import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Outlet, Link} from 'react-router-dom'

import {searchGame, setPageIndex} from '../actions/index.js'

import style from './Header.module.css'

function Searchbar(){
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const handleChange = (event) =>{
      setInput(event.target.value)
  }

  const handelOnSubmit = (event) =>{
    dispatch(searchGame(input))
    dispatch(setPageIndex(0))
  }

  return(
    <form onSubmit={ event => event.preventDefault()} >
    <div className={style.searchContainer}>
      <input
        className={style.inputText}
        type='text'
        name='search'
        value={input}
        placeholder='Game...'
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className={`${style.btn} ${style.primary}`}
        type='button'
        value='Search'
        onClick={handelOnSubmit}
      />
      </div>
    </form>
  )
}


const Header = () => {
  return(
      <header className={style.container}>
        <Searchbar />
        <div>
          <Link to='/home/create_videogame'>
            <input type='button' value='Craete videogame' className={`${style.btn} ${style.ghost}`}/>
          </Link>
        </div>
      </header>
  )
}

export default Header
