import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './Notification.module.css'

const Notification = ({action, msg, redirect})=>{

  return (
      <div className={style.background}>
        <div className={style.notification} >
            <h2>{msg}</h2>
            <div className={style.containerBtn}>
                 {
                   redirect?
                    <Link to='/home'>
                      <input className={style.buttonHome} type='button'  value='Home' />
                    </Link> :
                    null
                 }
                 {
                   action? <input className={style.button} type='button'  value='Close' onClick={action}/> : null
                 }
            </div>
        </div>
      </div>
  );
}

Notification.propTypes = {
  action: PropTypes.func,
  msg: PropTypes.string,
  redirect: PropTypes.bool
}

export default Notification;
