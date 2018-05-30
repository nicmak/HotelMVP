import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Card from '../Landing/Card'
import FilterBar from './FilterBar'
import { firstAction } from '../../actions/exampleAction'
import { allHotels } from '../../actions/hotelActions'
import { fetchAllHotels } from '../../adapter/fetch.js'
import './Landing.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    testDispatch:(text, test) => {
      dispatch(firstAction(text, test))
    },
    storeHotels: (hotels) => {
      dispatch(allHotels(hotels))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    testContent: state.exampleReducer,
    hotelContent: state.hotelReducer.hotels,
    filterValues: state.filterReducer
  }
}

class Landing extends Component {
  constructor(props) {
    super(props)
    this.getHotels = this.getHotels.bind(this)
    this.filterRules = this.filterRules.bind(this)
  }
  componentDidMount() {
    this.getHotels()
  }

  async getHotels () {
    const allHotel = await fetchAllHotels()
    this.props.storeHotels(allHotel)
  }

  filterRules(hotel, filters) {
    let decider = []
    const validFilters = []
    Object.keys(filters).forEach((key) => {
      if (filters[key] && key !== 'filtering') {
        validFilters.push(filters[key])
      }
    })
    for (var key in filters) {

      if (key === 'amenities' && filters['amenities'] !== '') {
        if (hotel.amenities.includes(filters['amenities'])) {
          decider.push(true)
        }
      }

      if (key === 'distance_to_venue' && filters['distance_to_venue'] !== '') {
        if (hotel.distance_to_venue < Number(filters['distance_to_venue'])) {
          decider.push(true)
        }
      }

      if (key === 'price_category' && filters['price_category'] !== '') {
        if (hotel.price_category === filters['price_category']) {
          decider.push(true)
        }
      }

      if (key === 'rating' && filters['rating']) {
        if (hotel.rating === Number(filters['rating'])) {
          decider.push(true)
        }
      }
    }
    return validFilters.length === decider.length
  }

  render() {
    const { hotelContent, filterValues } = this.props

    const { distance_to_venue, rating, price_category, amenities, filtering } = this.props.filterValues

    const hotelResults = filtering ? hotelContent.reduce((filtered, hotel, i) => {
      if (this.filterRules(hotel, filterValues )) {
          filtered.push(<Card hotel={hotel} index={i}/>)
      }
      return filtered
    }, []) : hotelContent.map((hotel, i) => {
      return (
        <Card hotel={hotel} index={i} />
      )
    })

    return (
      <section className='landingContainer'>
        <FilterBar hotels={hotelContent} />
        <div className='landingContainer-hotels'>{hotelResults}</div>
      </section>
    )
  }
}

Landing = connect(mapStateToProps, mapDispatchToProps)(Landing)

export default Landing;

