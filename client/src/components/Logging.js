import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import  {useEffect} from 'react'

import gameLogo from './images/videogame.png'
import {getAllGenres, getAllPlatforms} from '../actions/index.js'


const Logging =  () =>{
  const dispatch = useDispatch()

  useEffect( ()=>{
    dispatch(getAllGenres())
    dispatch(getAllPlatforms())
  }, [])

  return(
    <div className={'App App-header '} >
      <h1>Game Hub App</h1>
      <img src={gameLogo} width="500px" />

      <Link to='/home' >
        <div className={'button'}>
          <span id='btn-log In' >Log in</span>
        </div>
      </Link>

    </div>
  )
}

export default Logging;
