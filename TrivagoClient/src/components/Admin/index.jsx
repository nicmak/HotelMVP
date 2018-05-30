import React, { Component } from 'react'
import { connect } from 'react-redux'
import f from 'faker'
import { allHotels } from '../../actions/hotelActions'
import { addHotel, deleteHotel, fetchAllHotels } from '../../adapter/fetch'

const mapStateToProps = (state) => {
  return {
    hotels: state.hotelReducer.hotels,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeHotels: (hotels) => {
      dispatch(allHotels(hotels))
    }
  }
}

class Admin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amenities: [],
      hotelName: '',
      hotelDescription: '',
      hotelDistance: '',
      hotelRating: '',
      hotelPriceCategory: '',
      hotelIDDelete: ''
    }
    this.makeHotelForm = this.makeHotelForm.bind(this)
    this.amenitiesCheckBoxes = this.amenitiesCheckBoxes.bind(this)
    this.appendAmenities = this.appendAmenities.bind(this)
    this.submitHotel = this.submitHotel.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.deleteForm = this.deleteForm.bind(this)
    this.getHotels = this.getHotels.bind(this)
    this.handleDeleteHotel = this.handleDeleteHotel.bind(this)
  }

  componentDidMount() {
    this.getHotels()
  }

  async getHotels() {
    const allHotel = await fetchAllHotels()
    this.props.storeHotels(allHotel)
  }

  appendAmenities(e) {
    const updatedAmenities = this.state.amenities.concat(e.target.value)
    this.setState({ amenities: updatedAmenities })
  }

  amenitiesCheckBoxes() {
    const availableAmenities = ['Free Parking', 'Free Wifi', 'Pets', 'Restaurant', 'Gym', 'Pool', 'Spa']
    return (
          availableAmenities.map((amenity) => {
            return (
              <div>
               {amenity}:
                <input
                  name={amenity}
                  value={amenity}
                  type='checkbox'
                  onChange={this.appendAmenities}
                />
                </div>
            )
          })
    )
  }

  async submitHotel() {
    const hotelID = f.random.uuid()
    const hotel = {
      id: hotelID,
      name: this.state.hotelName,
      description: this.state.hotelDescription,
      distance_to_venue: this.state.hotelDistance,
      rating: this.state.hotelRating,
      price_category: this.state.hotelPriceCategory,
      amenities: this.state.amenities,
      rooms: [
        {
          id: f.random.uuid(),
          hotelName: this.state.hotelName,
          hotelID: hotelID,
          name: `${f.company.companyName()} Suite`,
          description: f.lorem.sentence(),
          max_occupany: Math.floor(f.random.number() / 1000),
          price_in_usd: parseFloat(Math.round(f.random.number()) / 100).toFixed(2)}
      ]
    }
    const hotelStatus = await addHotel(hotel)
  }

  handleInput(e) {
    switch (e.target.name) {
      case 'hotelName':
        this.setState({ hotelName: e.target.value })
        break
      case 'hotelDescription':
        this.setState({ hotelDescription: e.target.value })
        break
      case 'hotelDistance':
        this.setState({ hotelDistance: e.target.value })
        break
      case 'hotelRating':
        this.setState({ hotelRating: e.target.value })
        break
      case 'hotelPriceCategory':
        this.setState({ hotelPriceCategory: e.target.value })
        break
      case 'deleteHotel':
        this.setState({ hotelIDDelete: e.target.value })
      break
    }
  }

  makeHotelForm() {
    const { hotelName, hotelDescription, hotelDistance, hotelRating } = this.state
    return (
      <div>
        <div>
          Hotel Name:
          <input name='hotelName' value={hotelName} onChange={this.handleInput} />
        </div>
        <div>
          Description:
          <input name='hotelDescription' value={hotelDescription} onChange={this.handleInput} />
        </div>
        <div>
          Distance to Venue:
          <input name='hotelDistance' value={hotelDistance} onChange={this.handleInput} />
        </div>
        <div>
          Rating:
          <input name='hotelRating' value={hotelRating} onChange={this.handleInput} />
        </div>
        <div>
          Price Category:
          <select
            name='hotelPriceCategory'
            value={this.state.hotelPriceCategory}
            onChange={this.handleInput}
          >
            <option value=''>N/A</option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <div>Amenities</div>
        {this.amenitiesCheckBoxes()}
        <button onClick={this.submitHotel}>Submit Hotel</button>
      </div>
    )
  }

  handleDeleteHotel() {
    if (this.state.hotelIDDelete) {
      deleteHotel(this.state.hotelIDDelete)
    }
  }

  deleteForm() {
    return (
      <div className='AdminPage'>
      DELETE
        <select name='deleteHotel' value={this.state.hotelIDDelete} onChange={this.handleInput}>
          <option value=''>N/A</option>
          {
            this.props.hotels.map((hotel) => {
              return <option value={hotel.id}>{hotel.name}</option>
            })
          }
        </select>
        <button onClick={this.handleDeleteHotel}>Delete Button</button>
      </div>
    )
  }
  render() {
    return (
      <section>
        Admin Page
        <div>Adding Hotel</div>
        {this.makeHotelForm()}
        {this.deleteForm()}
      </section>
    )
  }
}

Admin = connect(mapStateToProps, mapDispatchToProps)(Admin)
export default Admin
