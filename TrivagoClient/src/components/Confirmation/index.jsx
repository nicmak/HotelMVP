import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectRoom } from '../../actions/hotelActions'
import './confirmation.scss'

const mapStateToProps = (state) => {
  return {
    hotel: state.hotelReducer.selectedRoom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveRoom: (room) => {
      dispatch(selectRoom(room))
    }
  }
}

class Confirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 'confirmation'
    }
  }

  componentDidMount() {
    const data = window.localStorage.getItem(this.props.match.params.bookID)
    const parsedData = JSON.parse(data)
    this.props.saveRoom(parsedData)
  }

  buildRoomInfo() {
    const hotel = this.props.hotel
    return (
      <div className='confirmationPage-room'>
        <div className='room-confirmID'>Confirmation ID:</div>
        <div>{this.props.match.params.bookID}</div>
        <div className='room-name'>Client Name:</div>
        <div>John Connor</div>
        <div className='room-hotelName'>Hotel</div>
        <div>{hotel.hotelName}</div>
        <div className='room-suite'>Suite</div>
        <div> {hotel.name}</div>
        <div className='room-price'>Total</div>
        <div>{hotel.price_in_usd}</div>
      </div>
    )
  }
  render() {

    return (
      <section className='confirmationPage'>
        <div className='confirmationPage-header'>
          Thank you for Booking with Trivago!
        </div>
        {this.props.hotel ? this.buildRoomInfo(): ''}
      </section>
    )
  }
}

Confirmation = connect(mapStateToProps, mapDispatchToProps)(Confirmation)

export default Confirmation
