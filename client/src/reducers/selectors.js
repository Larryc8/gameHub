
const orderByName = (array, ordering)=>{
  const newArray = [...array]
  let COMPARATOR = 0

  if(ordering === 'ascending'){
      COMPARATOR = 1
  }
  if(ordering === 'descending') {
     COMPARATOR = -1
  }

  return newArray.sort( (first, second)=>{
    if(first.name.charCodeAt() > second.name.charCodeAt()) return -COMPARATOR
    if(first.name.charCodeAt() < second.name.charCodeAt()) return COMPARATOR
    return 0
  })
}

const orderByRating = (array, ordering)=>{
  const newArray = [...array]
  let COMPARATOR = 0

  if(ordering === 'ascending'){
      COMPARATOR = -1
  }
  if(ordering === 'descending') {
     COMPARATOR = 1
  }

  return newArray.sort( (first, second)=>{
    if(first.rating > second.rating) return -COMPARATOR
    if(first.rating < second.rating) return COMPARATOR
    return 0
  })
}

const orderBy = (array, property, ordering) => {

    switch (property) {
      case 'name':
        return orderByName(array, ordering);
      case 'rating':
        return orderByRating(array, ordering);
      default:
        return orderByName(array, ordering);
    }
 }


export const selectGamesByFilters = (state) => {
  const {
      genreFilter,
      ordering,
      orderByProp,
    } = state.games

  let filteredGames;

  if (genreFilter === 'All') filteredGames = state.games.allGames;
  else{
    filteredGames =  state.games.allGames.filter( (game) => {
      const genres = game.genres
      return genres.some( (genre)=> genre.name === genreFilter)
    });
  }

  const sortedGames =  orderBy(filteredGames, orderByProp, ordering)

  return sortedGames
}
