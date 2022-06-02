import PropTypes from 'prop-types'
import {useEffect, useState} from  'react';
// import {useDispatch, useSelector}


import style from './TagsSelector.module.css';


const TagsSelector = ({tagsType, tags, action, error}) =>{
  const [selectedTags, addTag] = useState([])

  useEffect( ()=>{
      console.log(selectedTags)
  }, [selectedTags])


  const handleClick = ({target}) =>{
    const {name} = target

    if(target.checked){
      addTag( ()=>{
        const tags = [...selectedTags, {name}]
        action(tags, tagsType)
        return tags
      });
      return
    }
    if(!target.checked) {
      addTag( ()=>{
        const tags = selectedTags.filter( tag=>(tag.name !== name) )
        action(tags, tagsType)
        return tags
      });
    }
  }

  return(
      <div>
        <p>{tagsType}</p>
        <div className={style.tagContainer}>
          {
            tags?.map( (tag, index)=>{
              return (
                <div key={index} className={ selectedTags.find( (obj)=>obj.name === tag.name )? style.tagSelected: selectedTags.length === 5? style.tagDisabled: style.tag} >
                  <label>{tag.name}
                    <input  id={''+index} type='checkbox' name={tag.name} onClick={handleClick}
                      className={style.input}
                      disabled={selectedTags.length === 5 && !selectedTags.find( (obj)=>obj.name === tag.name )} />
                  </label>
                </div>)
            })
          }
        </div>
      </div>
  )
}

TagsSelector.propTypes = {
  tagsType: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.func
}

export default TagsSelector

// const handleClick = ({target}) =>{
//   const {name} = target
//
//   if(target.checked){
//     const tags = [...selectedTags, {name}]
//     action(tags, tagsType)
//   }
//   else {
//     const tags = selectedTags.filter( tag=>(tag.name !== name) )
//     action(tags, tagsType)
//   }
// }
