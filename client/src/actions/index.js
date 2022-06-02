import axios from 'axios'

export const GET_ALL_GAMES = 'GET ALL GAMES'
export const GAME_DETAILS = 'GAME DETAILS'
export const GET_ALL_GENRES = 'GET ALL GENRES'
export const GET_ALL_PLATFOMS = 'GET ALL PLATFOMS'
export const GET_DB_GAMES = 'GET DATABASE GAMES'
export const GET_API_GAMES = 'GET API GAMES'
export const SET_RESOURCE_AVAILABILITY = 'SET RESOURCE AVAILABILITY OF THE GAMES';
export const SET_RESOURCE_AVAILABILITY_DETAILS = 'SET AVAILABILITY OF A CARD DETAILS';
export const SET_RESOURCE_NOT_FOUND =   ' SETS IF A RESOURCE WAS FOUND OR NOT';
export const SET_GAME_ADDED = 'SET A VALUE TRUE WHEN A NEW GAMES IS GAME ADDED'
export const SET_GROUP = 'SET A GROUP OF THE GAMES BY THE API, DATABASE OR BOTH'

export const FILTER_GAMES_BY_GENRE = 'GET ALL GAMES BY GENRE'
export const GET_GAMES_BY_CREATED = 'GET ALL GAMES BY CREATED'// server
export const ORDER_BY_NAME = 'ORDER  ALPHABETICALLY'
export const ORDER_BY_RATING = 'ORDER BY RATING'

export const ADD_GAME = 'ADD GAME TO DATABASE'///TEST
export const ORDER_GAMES_BY_PROP = 'ORDER BY PROPROPERTY'
export const ORDER =  'ORDER'

export const MOVE_NEXT_PAGE = 'MOVE TO THE NEXT PAGE'
export const MOVE_PREV_PAGE = 'MOVE TO THE PREVIUS PAGE'
export const MOVE_TO_INDEX_PAGE = 'MOVE TO DETERMINATE PAGE INDEX'
export const SET_PAGE_SIZE = 'SET COUNT OF ELEMENT RECEIVED'

const url = 'http://localhost:3001/api';

function setGroup(group){
  return {
    type: SET_GROUP,
    payload: group /// All, My games, Others these are the unique value a can take the function as group
  }
}

export function setGameAdded(value) {
  return {
    type: SET_GAME_ADDED,
    payload: value
  }
}

function getGames(games){
  return {
      type: GET_ALL_GAMES,
      payload: games
  }
}

function setResourceNotFound(value){
  return {
    type: SET_RESOURCE_NOT_FOUND,
    payload: value
  }
}

export function setAvailable(value){
  return {
    type: SET_RESOURCE_AVAILABILITY,
    payload: value
  }
}

export function getAllGames (){
    return async  dispatch =>{
        dispatch(setAvailable(false))
        dispatch(setResourceNotFound(false))

        const games = await axios.get(`${url}/videogames`).then(res=>res.data)

        dispatch(setAvailable(true))

        if(!games.length) {
          dispatch(setResourceNotFound(true));
          dispatch(setGroup('All'))
        }
        else {
          dispatch(getGames(games));
          dispatch(setGroup('All'))
        }
    }
}

export function getGameById(id){
  return async (dispatch, getStore) => {
    dispatch(setAvailable(false))

    if(getStore().games.gameDetails.id !== id) {
      const {data} = await axios.get(`${url}/videogames/${id}`)
      dispatch(setAvailable(true))
      dispatch({
        type: GAME_DETAILS,
        payload: data
      })
    }

  }
}

export function searchGame(name){
    return async dispatch => {
      dispatch(setAvailable(false))
      dispatch(setResourceNotFound(false))

      const games = await axios.get(`${url}/videogames?name=${name}`).then(res=>res.data)
      dispatch(setAvailable(true))

      if(!games.length){
         dispatch(setResourceNotFound(true));
         dispatch(setGroup('Search results'))
      }
      else {
        dispatch(getGames(games));
        dispatch(setGroup('Search results'))
      }
    }
}

export function filterByGenre(genre){// front filter
    return {
      type: FILTER_GAMES_BY_GENRE,
      payload: genre
  }
}

export function selectMyGames(){
  return async dispatch =>{
    dispatch(setAvailable(false))
    dispatch(setResourceNotFound(false))

    const games = await axios.get(`${url}/videogames?filterby=created`).then(res=>res.data)
    dispatch(setAvailable(true))

    if(!games.length) {
      dispatch(setResourceNotFound(true));
      dispatch(setGroup('My games'));
    }
    else{
      dispatch({
        type: GET_DB_GAMES,
        payload: games
      })
      dispatch(setGroup('My games'));
    }
  }
}

export function selectOthersGames(){
  return async dispatch =>{
    dispatch(setAvailable(false))
    dispatch(setResourceNotFound(false));

    const games = await axios.get(`${url}/videogames?filterby=instock`).then(res=>res.data)
    dispatch(setAvailable(true))

    if(!games.length){
      dispatch(setResourceNotFound(true));
      dispatch(setGroup('Others'));
    }
    else {
      dispatch({
        type: GET_API_GAMES,
        payload: games
      });
      dispatch(setGroup('Others'));
    }
  }
}

export function selectGames(eligibility){
  return dispatch =>{
    switch (eligibility) {
      case 'My games':
        dispatch(selectMyGames());
        break;
      case 'Others':
        dispatch(selectOthersGames());
        break;
      default:
        dispatch(getAllGames());
    }
  }
}

export function getAllPlatforms(){//WARNING
  return async  dispatch =>{
      const platforms = await axios.get(`${url}/videogames?platforms=true`).then(res=>res.data)
      dispatch({
          type: GET_ALL_PLATFOMS,
          payload: platforms
      })
  }
}


export function getAllGenres(){
  return async  dispatch =>{
      const genres = await axios.get(`${url}/genres`).then(res=>res.data)
      dispatch({
          type: GET_ALL_GENRES,
          payload: genres
      })
  }
}

export function orderBy(property) {
  return {
    type: ORDER_GAMES_BY_PROP,
    payload: property
  }
}


export function setOrderType(ordering){
  return {
    type: ORDER,
    payload: ordering
  }
}

export function moveToNextPage(){
  return {
    type: MOVE_NEXT_PAGE
  }
}

export function moveToPrevPage(){
  return {
    type: MOVE_PREV_PAGE
  }
}

export function setPageIndex(index){
  return {
    type: MOVE_TO_INDEX_PAGE,
    payload: index
  }
}
