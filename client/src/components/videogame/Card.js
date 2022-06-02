import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom';

import TagsContainer from './TagsContainer.js'

import style from './Card.module.css'
import imageNotFound from '../images/image-not-found.png'


const Card = ({id, name, background_image, genres, rating}) => {

  const handleImgSourceError = ({target})=>{
    target.onerror = null;
    target.src = imageNotFound
  }

  return(
    <div className={style.card}>
      <div className={style.rating}>{rating}</div>
      <img className={style.bkImg}
        src={background_image}
        onError={handleImgSourceError}
        alt=""
      />
      <div className={style.Cardbody}>
          <div className={style.name}>
            <NavLink to={`/home/videogames/${id}`}><span className={style.nameText} >{name}</span></NavLink>
          </div>
          <TagsContainer tags={genres} />
      </div>
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string,
  background_image: PropTypes.string,
  genres: PropTypes.array
}

export default Card;


// <div className={style.btn}>
//   <a href="#">Learn More</a>
// </div>

// <div className={style.card}>
//   <img src={background_image} style={img} />
//   <span>{name}</span>
//   <TagsContainer tags={genres} />
//   <p>{rating}</p>
// </div>
