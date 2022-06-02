import PropTypes from 'prop-types'

import TagsContainer from '../videogame/TagsContainer.js'
import style from './CardTemplate.module.css'

const CardTemplate = ({videogame})=>{
  const {name,
        description,
        released,
        genres,
        platforms,
        rating,
        background_image,
     } = videogame

  return(
    <div className={style.card}>
      <img className={style.bkImg} src={background_image} alt="" />
      <div ></div>
      <div className={style.Cardbody}>
          <div className={style.name}>
            <span className={style.nameText} >{name}</span>
          </div>
          <p>Genres: </p>
          <TagsContainer  tags={genres} />
          <p>Platforms: </p>
          <TagsContainer  tags={platforms} />
      </div>
    </div>
  )
}

CardTemplate.propTypes ={
  videogame: PropTypes.shape({
    name: PropTypes.string ,
    description: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.object),
    released: PropTypes.string,
    platforms: PropTypes.arrayOf(PropTypes.object),
    background_image: PropTypes.string,
    rating: PropTypes.number,
  })
}

export default CardTemplate;
