import {useSelector} from 'react-redux'

import {setPageIndex} from '../../actions/index.js'

import NavButton from './NavButton.js'

const fill = (array, size, cb)=>{// fill an array  with the returned callback value
  const newArray = [...array]
  for(let index=0; index<size; index++){
    newArray.push(cb(index))
  }
  return newArray
}



const NavIndexes = ({pageSize})=>{
  const pageSliceSize = useSelector((state)=>state.games.pageSliceSize);
  const indexCount = Math.ceil(pageSize/pageSliceSize)

  return (
    <div>
    {
      fill( [], indexCount, (index)=>{
          return <NavButton
            key={index}
            index={index}
            name={index +1}
            action={setPageIndex} />// WARNIG ERRRO
      })
    }
    </div>
  )
}

export default NavIndexes;
