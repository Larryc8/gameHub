import PropTypes from 'prop-types'
import {useSelector} from 'react-redux';

import style from './TagsContainer.module.css'

const TagsContainer = ({tags})=>{
  const tagfilter = useSelector( (state)=>state.games.genreFilter)

  return(
      <div className={style.gameTagswarapper}>
        <ul className={style.gameTagsCotainer}>
          {
            tags?.map( (tag, index) => <li
            className={tagfilter === tag.name? style.selectedTag :  style.gameTag}
            key={index}>
                {tag.name}
            </li>)
          }
        </ul>
      </div>
  )
}

TagsContainer.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.object)
}

export default TagsContainer
