import style from './Loading.module.css'

const Loading = ()=>{
  return(
    <div className={style.loader}>
     <span className={style.span} ></span>
     <span className={style.span}></span>
     <span className={style.span}></span>
     <span className={style.span}></span>
     <span className={style.span}></span>
   </div>
  )
}

export default Loading;
