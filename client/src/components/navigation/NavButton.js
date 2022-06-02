import {
  useSelector,
  useDispatch
} from 'react-redux'

const navButton = {
  border: '1px solid #023047',
  margin: '2px',
  width: '30px',
  height: '30px'
}

const navButtonslected = {
  border: '1px solid #023047',
  margin: '2px',
  background: '#023047',
  width: '45px',
  height: '30px',
  color: '#fff',
  transition: "all 0.2 ease"
}

const NavButton = ({name, action, index})=>{
  const dispatch = useDispatch()
  const pageIndex = useSelector((state)=>state.games.pageIndex);

  const handleClick = ({target})=>{
    dispatch(action(index))
  }

  return(
      <input type='button'  value={name} onClick={handleClick}  style={index === (pageIndex)? navButtonslected : navButton}/>
  )
}

export default NavButton;
