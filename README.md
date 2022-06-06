<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Game Hub 

<p align="right">
  <img height="200" src="./videogame.png" />
</p>


Esta es una Single Web Application, que consume datos de  la api https://rawg.io/ . En esta aplicación web puedes buscar información sobre  videojuegos  y encontrar información más detallada sobre estos. Asimismo puedes crear videojuegos y subirlos a la plataforma para que estos queden guardados permanentemente.

Link del repo:  https://github.com/Larryc8/gameHub

## Features :
- Filtrado de videojuegos por género y por  videojuegos disponibles en la plataforma o creados por el usuario 

- Ordenamiento alfabéticamente por nombre o al rating de manera descendente o ascendente

- Mostrar información detallada de cada videojuego

- Formulario controlado para la creación de nuevos videojuegos para ser agregados a la plataforma


## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. 
