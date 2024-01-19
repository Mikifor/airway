import './App.css'
import React, { useState } from 'react'
import Flights from './components/generator'
import ReactDOM from 'react-dom'

const CalendarCell = (props) => {
  var month = 'Мес'
  switch (props.month) {
    case 1: month = 'ЯНВ'
      break
    case 2: month = 'ФЕВ'
      break
    case 3: month = 'МАРТ'
      break
    case 4: month = 'АПР'
      break
    case 5: month = 'МАЙ'
      break
    case 6: month = 'ИЮНЬ'
      break
    case 7: month = 'ИЮЛЬ'
      break
    case 8: month = 'АВГ'
      break
    case 9: month = 'СЕН'
      break
    case 10: month = 'ОКТ'
      break
    case 11: month = 'НОЯ'
      break
    case 12: month = 'ДЕК'
      break
    default: return 'MЕС'
  }

  return (
    <div className="calendar-cell">
      <div className="top-text">{month}</div>
      <div className="bottom-text">{props.day}</div>
    </div>
  )
}

const TravelBlock = (ticket) => {
  return <div>
    <div className="times">{ticket.departureTime}---{ticket.arrivalTime}</div>
    <div className="cities">{ticket.departureCity[1]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ticket.arrivalCity[1]}</div>
  </div>
}

const Stops = (ticket) => {
  var stops = ticket.stops
  stops === 0 ? stops = 'Прямой рейс' : stops = stops + 0
  return <div>
    Количество пересадок: &nbsp;&nbsp;{stops}
  </div>
}

const OnFlightBlock = (props) => {
  var time = props.ticket.travelTime
  var hours = Math.floor(time / 60)
  var minutes = time % 60
  hours < 10 ? hours = '0' + hours : hours = hours + 0
  minutes < 10 ? minutes = '0' + minutes : minutes = minutes + 0
  time = hours + ':' + minutes
  return <div className="onFlight">Время в пути:&nbsp;&nbsp;{time} </div>

}

const Ticket = ({ ticket }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleCardClick = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const Baggage = () => {
    return <div className='baggage'>
      {ticket.baggage}
    </div>
  }

  const Modal = () => {
    return ReactDOM.createPortal(
      <div className="modal-overlay" onClick={handleModalClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-left">
            <div className='price'>₽{ticket.cost}</div>
            <div className="flight-class">{ticket.flightClass}</div>
            <Baggage />
          </div>
          <div className='modal-middle'>
            {ticket.arrivalCity[0]} - {ticket.departureCity[0]}
            <div>
              <br />
            </div>
            <div className="ticket-down">
              <CalendarCell day={ticket.day} month={ticket.month} />
              <TravelBlock {...ticket} />
            </div>
          </div>
          <div className='modal-right'>
            <OnFlightBlock ticket={ticket} />
            <div><br /></div>
            <Stops {...ticket} />
            <div className='close-button'>
            <button onClick={handleModalClose}>Закрыть</button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  }

  return <div className="ticket" onClick={handleCardClick}>
    <div className="ticket-up">
      <div className='price'>₽{ticket.cost}</div>
    </div>
    <div className="ticket-mid">
      <div>&nbsp;</div>
      <div>{ticket.arrivalCity[0]} - {ticket.departureCity[0]} </div>
      <div>&nbsp;</div>
    </div>
    <div className="ticket-down">
      <CalendarCell day={ticket.day} month={ticket.month} />
      <TravelBlock {...ticket} />
      <OnFlightBlock ticket={ticket} />
    </div>
    {isModalOpen && <Modal />}
  </div>
}

function App() {
  const [filterStops, setFilterStops] = useState(null)
  const filterTickets = () => {
    return filterStops === null
      ? Flights
      : Flights.filter((ticket) => ticket.stops === filterStops)
  }

  return (
    <div className="app-container">
      <div className="filters-container">
        <select onChange={(e) => setFilterStops(Number(e.target.value))}>
          <option value={null}>Все рейсы</option>
          <option value={0}>Прямой рейс</option>
          <option value={1}>Одна пересадка</option>
          <option value={2}>Две пересадки</option>
        </select>
        <div className="select-arrow"></div>
      </div>
      <div className="tickets-container">
        {filterTickets().map((ticket) => (
          <Ticket ticket={ticket} />
        ))}
      </div>
    </div>
  )
}

export default App