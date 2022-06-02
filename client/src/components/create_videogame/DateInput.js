import {useState} from 'react'

const input = {
  border: "none",
  backgroundColor: "rgba(70, 157, 137, 0.3)",
  fontSize: "15px",
  padding: "5px 12px",
  borderRadius: "3px",
  color: "#000",
}

const container = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '90%',
  gap: '20px',
  padding: '5px',
  borderRadius: '5px'
}

const DateInput = ({action}) =>{
  const  [date, setDate] = useState({
    day: '',
    month: '',
    year: ''
  })

  const dateOptions = Object.keys(date)

  const handleChange = ({target})=>{
      setDate( ()=>{
          const newdate =  {
            ...date,
            [target.name]: target.value
          }
          action(`${newdate.year? newdate.year: 0}-${newdate.month? newdate.month: 0}-${newdate.day? newdate.day: 0}`) // se pondra cero encada campo de fecha en caso de que la fecha se un string vacio
          return !target.value || Number(target.value)? newdate: date // solo se va a actulizar el valor de las input cuando el  valor de entrada es un numero
      })
  }

  return(
    <div  >
        <p>Date: </p>
        <div style={container}>
          <div >
            <span >day:  </span>
            <input name='day' maxLength={2} value={date.day} onChange={handleChange}  style={{...input, width: '30px'}} placeholder='dd'/>
          </div>
          <div>
            <span >month:  </span>
            <input name='month' maxLength={2} value={date.month} onChange={handleChange}  style={{...input, width: '30px'}} placeholder='mm'/>
          </div>
          <div>
            <span >year:  </span>
            <input name='year' maxLength={4} value={date.year} onChange={handleChange}  style={{...input, width: '50px'}} placeholder='yyyy'/>
          </div>
        </div>
    </div>
  )
}




export default DateInput
