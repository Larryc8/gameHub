

const validate = (videogame) =>{
  const error = {}


  const imgUrl = videogame.background_image? videogame.background_image.split('/'): [];
  const date = videogame.released.split('-');

  if(!videogame.name) error.name = 'name cannot be an empty field';

  if(!videogame.description) error.description = 'description cannot be an empty field';

   if(Number(videogame.rating)>5 || Number(videogame.rating)<0 ) error.rating = 'rating have to be between 0 and 5';

   if(!videogame.genres.length) error.genres = 'Your game atleast have to belongs to a one genre';

   if(videogame.genres.length > 5) error.genres = 'Your game have to belongs max 5 genres';

   if(!videogame.platforms.length) error.platforms = 'Your game atleast have to belongs to a one platform';

   if( imgUrl[0] !== 'https:' ) error.background_image = 'The image have to be an valid url';

   if( !Number(date[0]) || !Number(date[1]) || !Number(date[2]) ) error.released = 'Insert a valid date just numbers';
   else if( date[2] == 0 || date[1] == 0 || date[0] == 0  ) error.released = error.released + ': there is a empty field' ;
   else if( date[2]<1 || date[2]> 31) error.released = `Invalid value for day` ;
   else if(date[1]<1 || date[1]> 12) error.released = `Invalid value for month` ;
   else if( date[0]< 1200) error.released = `Invalid value for year`;


  return error;
}

export default validate;
