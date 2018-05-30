import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import f from 'faker'
import { fetchHotel } from '../../adapter/fetch'
import { selectHotel, selectRoom } from '../../actions/hotelActions'
import './HotelDetail.scss'

const mapStateToProps = (state) => {
  return {
    hotel: state.hotelReducer.selectedHotel,
    dataAvailability: state.hotelReducer.dataAvailability
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveSelectedHotel: (hotel) => {
      dispatch(selectHotel(hotel))
    }
  }
}



class HotelDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 'HotelDetail'
    }
    this.loadHotel = this.loadHotel.bind(this)
    this.hotelImage = this.hotelImage.bind(this)
    this.hotelContent = this.hotelContent.bind(this)
    this.handleBooking = this.handleBooking.bind(this)
  }

  componentDidMount() {
    this.loadHotel()
  }

  async loadHotel() {
    const selectedHotel = await fetchHotel(this.props.match.params.hotelID)
    this.props.saveSelectedHotel(selectedHotel[0])
  }

  hotelImage() {
    return (
      <div className='hotelDetail-content-image'>
        <img src='data:image/jpeg;base64,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' />
      </div>
    )
  }

  hotelContent() {
    const hotelInfo = this.props.hotel
      return (
        <div className='hotelDetail-content'>
          {this.hotelImage()}
          <div className='hotelDetail-content-name'>{hotelInfo.name}</div>
          <div className='hotelDetail-content-rating'>
            Rating: {hotelInfo.rating}
          </div>
          <div className='hotelDetail-content-distance'>{hotelInfo.distance_to_venue} m from City Center</div>
          <div className='hotelDetail-content-descrb'>{hotelInfo.description}</div>
          <div className='hotelDetail-content-price'>
          Average Pricing: {hotelInfo.price_category}</div>
        </div>
      )
  }

  handleBooking(room, bookID) {
    window.localStorage.setItem(bookID, JSON.stringify(room))
  }

  hotelRooms() {
    const { rooms } = this.props.hotel
    const bookingConfirmationID = f.random.uuid()
    const sortedRoom = rooms.sort((a,b) => {
      return a.price_in_usd - b.price_in_usd
    })
    return sortedRoom.map((room) => {
      return (
        <div className='hotelDetail-room'>
          <div>{room.name}</div>
          <div>{room.description}</div>
          <div>Max Occupany: {room.max_occupany}</div>
          <div>${room.price_in_usd} USD</div>
          <button onClick={() => this.handleBooking(room, bookingConfirmationID)}>
            <NavLink to={`/confirmation/${bookingConfirmationID}`}>Book Now</NavLink>
          </button>
        </div>
      )
    })
  }

  render() {
    const hotelInfo = this.props.hotel
    return (
      <section className='hotelDetail'>
        {this.props.dataAvailability ? this.hotelContent() : ''}
        <div className='hotelDetail-rooms'>
        {this.props.dataAvailability ? this.hotelRooms() : ''}
        </div>
      </section>
    )
  }
}

HotelDetail = connect(mapStateToProps, mapDispatchToProps)(HotelDetail)
export default HotelDetail
