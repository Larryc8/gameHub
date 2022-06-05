import {useState, useEffect} from  'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {getAllGenres, getAllPlatforms, setGameAdded} from '../../actions/index.js';
import validate from './validate.js'

import DateInput from './DateInput.js'
import TagsSelector from './TagsSelector.js'
import Notification from '../Notification.js'
import CardTemplate from './CardTemplate.js'
import Loading from '../Loading.js'

import previous from '../images/previous.svg'

import style from './Form.module.css'


const ShowError = ({error}) =>{ // render a error message if de  error propery  error is no tempty
  const alert = {
    padding: "0.2px 6px",
    border: "1px solid red",
    color: "red",
    borderRadius: "50%",
    fontSize: "11px",
    fontWeight: '900'
  }

  return(
      error? <p style={{color: 'red', "font-size": "14px"}}>  <span style={alert}>!</span> {error}</p> : null
  )
}


const Form = ()=>{
    const genres = useSelector( (state)=>state.genres)
    const platforms = useSelector( (state)=>state.platforms)
    const dispatch = useDispatch()

    useEffect( ()=>{
    if(!genres.length) dispatch(getAllGenres());
    if(!platforms.length) dispatch(getAllPlatforms())
    }, [])

    const [videogame, setVideogame] = useState({
        name: '',
        description: '',
        released: '',
        background_image: '',
        rating: 0,
        genres: [],
        platforms: []
    })

    const [error, setError] = useState({name: 'name cannot be an empty field'})
    const [showMessage, setShowMessage] = useState(false)

    useEffect( ()=>{
      console.log('VIDEO GAMES', videogame)
    }, [videogame])

    const handleNotification = ()=>{
      setShowMessage(false)
    }

    const handleSubmit = async (event)=>{
      if(Object.keys(error).length) return //console.log('POST', videogame);

      dispatch(setGameAdded(false))
      const url = 'http://192.168.1.13:3001/api';
      const createdGame = await axios.post( `${url}/videogames`, {
        ...videogame,
        name: videogame.name[0].toUpperCase()+videogame.name.substring(1)
      }).then( reponse => reponse.data);

      setShowMessage(true)
      dispatch(setGameAdded(true))
      console.log('post recivido', createdGame);
    }

    const handleChange = ({target}) =>{
      const newVideogame = {
       ...videogame,
       [target.name]: target.value
     }

      setVideogame(newVideogame)
      setError(validate(newVideogame))
    }

    const handleTagsSelection = (tags, tagsType)=>{
      const newVideogame = {
        ...videogame,
        [tagsType]: tags
      }

      setVideogame(newVideogame)
      setError(validate(newVideogame))
    }

    const handleDateSelection = (date)=>{
      const newVideogame = {
        ...videogame,
        released: date
      }

      setVideogame(newVideogame)
      setError(validate(newVideogame))
    }


    return(
        <div className={style.bigContainer}>
          {
            showMessage? <Notification action={handleNotification} msg='Videogame Created Succesfully' redirect={true}/> :
             null
           }
          <div className={style.container}>
                <Link to='/home'><img src={previous}
                  style={{
                    width: "30px", background: "#f38375",
                    boxShadow: "2px 2px 6px #e85d04",
                  }}
                /></Link>
              <h1>Create your videogame</h1>
              <div >
                <label>
                  <p>name:</p>
                  <input
                      className={style.inputName}
                      id='name'
                      name='name'
                      placeholder='Just write a cool name...'
                      autoComplete='off'
                      value={videogame.name}
                      onChange={handleChange}
                  />
                </label>
              </div>
              <ShowError error={error.name}/>

              <div>
                  <label>
                    <p>description:</p>
                    <textarea
                        name='description'
                        className={style.inputDescription}
                        maxlength='250'
                        placeholder='Some cool things about your videogame...'
                        value={videogame.description}
                        onChange={handleChange}
                    />
                  </label>
              </div>
              <ShowError error={error.description}/>

              <div>

              </div>
              <DateInput action={handleDateSelection}/>
              <ShowError error={error.released}/>
              <div>
                  <label>
                    <p>rating:</p>
                    <input
                        className={style.inputRating}
                        name='rating'
                        type='text'
                        autoComplete='off'
                        maxlength='4'
                        value={videogame.rating}
                        onChange={handleChange}
                    />
                  </label>
                  <ShowError error={error.rating}/>
              </div>
              <div>
                  <label>
                    <p>background image:</p>
                    <input
                        type='url'
                        name='background_image'
                        placeholder='https://www.example.com...'
                        className={style.inputUrl}
                        value={videogame.background_image}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                  </label>
                  <ShowError error={error.background_image} />
              </div>
              <TagsSelector tagsType='genres' tags={genres} action={handleTagsSelection}  />
              <ShowError error={error.genres}/>
              <hr/>
              <TagsSelector tagsType='platforms' tags={platforms} action={handleTagsSelection}  />
              <ShowError error={error.platforms}/>
              <br style={{margin: "20px"}}/>
              <input className={style.button} type='submit' value='Create' onClick={handleSubmit}  />
          </div>
          <div>
            <h1 style={{color: '#fff'}}>Crea la realidad que imaginaste</h1>
            <CardTemplate videogame={videogame} />
          </div>
        </div>
    )
}

export default Form;
