import {useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react'

import TagsContainer from './TagsContainer.js'
import Loading from '../Loading.js'

import {getGameById} from '../../actions/index.js'

import imageNotFound from '../images/image-not-found.png'
import style from './DetailedCard.module.css'


const DetailedCard = ()=>{
  const {gameID} = useParams();
  const dispatch = useDispatch()

  const available = useSelector( (state)=>state.games.available)

  useEffect( ()=>{
    dispatch(getGameById(gameID))
    console.log('CARD DETAILED MOUNTED')
  },[])

  const handleImgSourceError = ({target})=>{
    target.onerror = null;
    target.src = imageNotFound
  }
  const {name,
        description,
        released,
        genres,
        platforms,
        rating,
        background_image,
     } = useSelector( (state)=>state.games.gameDetails);


  return (
    !available? <Loading/>:
    <figure>
      <img className={style.img} src={background_image} alt='images'/>
      <figcaption className={style.outer}>
      <div >
        <div className={style.content}>
          <div className={style.rating}>{rating}</div>
          <h1>{name}</h1>
              <p>released in: {released}</p>
                genres:
              <TagsContainer tags={genres}/>
                <br/>
                platforms:
              <TagsContainer tags={platforms}/>
              <br/>
            <div className={style.text}>
              {description}
            </div>
            <div className={style.buttonContainer}>
              {
                available?
                <Link to='/home'><input type='button' value='Back' className={style.button} /></Link> :
                null
              }
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
  )
}


export default DetailedCard
