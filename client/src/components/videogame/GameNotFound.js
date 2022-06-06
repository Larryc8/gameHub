import {useDispatch} from 'react-redux'
import {getAllGames, filterByGenre} from '../../actions/index.js'

import style from './CardsContainer.module.css'

import forest from '../images/forest.svg'

const GameNotFound = ({msg})=>{                                                 
    const dispatch = useDispatch()                                                
                                                                                     
     const styleContainer =  {                                                     
       position: 'absolute',                                                                                                                       
         left: '50%',                                                                
         transform: "translate(-50%, 100px)",                                        
         background: '#fff',                                                         
         padding: '20px',                                                            
         boxShadow: '0 5px 50px rgba(0,0,0, .4)'                                     
       }                                                                             
                                                                                     
       return (                                                                      
         <div style={styleContainer}>                                                
          <h1>VIDEOGAME NOT FOUND</h1>                                              
          <img src={forest} />                                                      
          <p style={{fontSize: "18px"}}>{msg}</p>                                                                                                   
          <span                                                                                                                                     
              className={style.buttonPrimary}                                                                                                       
              onClick={ ()=>{                                                                                                                       
                dispatch(getAllGames())                                                                                                             
                dispatch(filterByGenre('All'))                                                                                                      
              }}                                                                                                                                    
            >Go home</span>                                                                                                                         
        </div>                                                                                                                                      
      )                                                                                                                                             
 }   


export default GameNotFound;                                                 

