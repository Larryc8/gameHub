import {
  useSelector,
  useDispatch
} from 'react-redux'


const NavButton = ({name, action, index, pageSize, className})=>{
  const dispatch = useDispatch()

  const pageIndex = useSelector((state)=>state.games.pageIndex);
  const pageSliceSize = useSelector((state)=>state.games.pageSliceSize);
  const indexCount = Math.ceil(pageSize/pageSliceSize)

  const handleClick = ({target})=>{
    dispatch(action(index))
  }

  return(
      ( name === 'Prev'? pageIndex > 0: pageIndex < (indexCount -1) ) ?
        <input type='button'  value={name} onClick={handleClick} className={className}/> :
      null
  )
}

export default NavButton;
