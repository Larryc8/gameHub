import {
  GET_ALL_GAMES,
  GAME_DETAILS,
  GET_ALL_GENRES,
  FILTER_GAMES_BY_GENRE,
  ORDER_GAMES_BY_PROP,
  ORDER,
  GET_DB_GAMES,
  GET_API_GAMES,
  ADD_GAME,
  MOVE_NEXT_PAGE,
  MOVE_PREV_PAGE,
  MOVE_TO_INDEX_PAGE,
  SET_PAGE_SIZE,
  GET_ALL_PLATFOMS,
  SET_RESOURCE_AVAILABILITY,
  SET_RESOURCE_AVAILABILITY_DETAILS,
  SET_RESOURCE_NOT_FOUND,
  SET_GAME_ADDED,
  SET_GROUP
} from '../actions/index.js'


const defaultGamestate = {
  allGames: [],
  filteredGames: [],
  gameDetails: {},
  genreFilter: 'All',
  orderByProp: 'rating',
  ordering: 'descending',
  pageSliceSize: 15,
  pageIndex: 0,
  games: 'All',
  available: false,
  wasNotFound: true,
  detailsAvailable: false,
  newGameWasAdded: false
}

export function games(state = defaultGamestate, action){
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        filteredGames: [...action.payload],
        allGames: [...action.payload],
        games: 'All'
      }
    case GET_DB_GAMES:
      return {
        ...state,
        allGames: [...action.payload],
        games: 'My games'
      }
    case GET_API_GAMES:
      return {
        ...state,
        allGames: [...action.payload],
        games: 'Others'
      }
    case GAME_DETAILS:
      return{
        ...state,
        gameDetails: action.payload
      }
    case ORDER_GAMES_BY_PROP:
      return {
        ...state,
        orderByProp: action.payload
      }
    case FILTER_GAMES_BY_GENRE:
      return {
        ...state,
        genreFilter: action.payload
      }
    case ORDER:
      return {
        ...state,
        ordering: action.payload
      }
    case ADD_GAME:
      return {
        ...state,
        newGame: action.payload
      }
    case MOVE_PREV_PAGE:
      return {
        ...state,
        pageIndex: state.pageIndex -1
      }
    case MOVE_NEXT_PAGE:
      return {
        ...state,
        pageIndex: state.pageIndex +1
      }
    case MOVE_TO_INDEX_PAGE:
      return {
        ...state,
        pageIndex: action.payload
      }
      case SET_RESOURCE_AVAILABILITY:
        return {
          ...state,
          available: action.payload
        }
      case SET_RESOURCE_AVAILABILITY_DETAILS:
        return {
          ...state,
          detailsAvailable: action.payload
        }
      case SET_RESOURCE_NOT_FOUND:
        return {
          ...state,
          wasNotFound: action.payload
        }
      case SET_GAME_ADDED:
        return {
          ...state,
          newGameWasAdded: action.payload
        }
      case SET_GROUP:
        return {
          ...state,
          games: action.payload// group the games by All, My games and Others
        }
    default:
      return state
  }
}

export function genres(state=[], action){
  switch (action.type) {
    case GET_ALL_GENRES:
      return [...action.payload]
    default:
      return state
  }
}

export function platforms(state=[], action){
  switch (action.type) {
    case GET_ALL_PLATFOMS:
      return [...action.payload]
    default:
      return state
  }
}
