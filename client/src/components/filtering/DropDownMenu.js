import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react';
import PropTypes from 'prop-types'

import {setPageIndex} from '../../actions/index.js'

import style from './DropDownMenu.module.css';
import arrow from '../images/arrow.png'

const DropDownMenu = ({currentSelection, name, options, filterAction}) =>{
  const [open,setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event)=>{
    dispatch(filterAction(event.target.name))
    dispatch(setPageIndex(0))
  }

  return (
    <div className={style.container}>
    <span>{name}: </span>
    <input  id={name} className={style.optionSelected} onClick={()=>setOpen(!open)} value={currentSelection} />

     <label htmlFor={name} > <img width='10px' src={arrow}  style={{transform: open? 'rotate(180deg)': 'rotate(0deg)' }}   /> </label> :
      {
        !open?
        null :
        <div className={style.options}>
          {
            options?.map( (option, i)=>{
              return (
                <input key={i} className={style.option}  name={option.name} value={option.name} onClick={handleClick} readOnly={true} />
              )
            })
          }
        </div>
      }
    </div>
  )
}


DropDownMenu.propTypes = {
  filterAction: PropTypes.func.isRequired,
  options: PropTypes.arrayOf( PropTypes.object).isRequired
}


export default DropDownMenu;
