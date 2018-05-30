import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterActions } from '../../../actions/filterActions'
import './filterBar.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    sendFilterResults: (filters) => {
      dispatch(filterActions(filters))
    },
    sendEmptyFilter: () => {
      dispatch({type:'EMPTY_FILTER'})
    }
  }
}

const mapStateToProps = (state) => {
  return {
    filterValues: state.filterReducer
  }
}



class FilterBar extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.submitFilterResults = this.submitFilterResults.bind(this)
    this.resetFilters = this.resetFilters.bind(this)
    this.state = {
      distance_to_venue: '',
      rating: '',
      price_category: '',
      amenities: ''
    }
  }

  handleInput(e) {
    switch(e.target.name) {
      case 'distance_to_venue':
        this.setState({ distance_to_venue: e.target.value})
        break
      case 'rating':
        this.setState({ rating: e.target.value })
        break
      case 'price_category':
        this.setState({ price_category: e.target.value })
        break
      case 'amenities':
        this.setState({ amenities: e.target.value })
        break
    }
  }

  submitFilterResults() {
    const { distance_to_venue, rating, price_category, amenities } = this.state
    if (distance_to_venue || rating || price_category || amenities)
      this.props.sendFilterResults(this.state)

  }

  resetFilters() {
    this.props.sendEmptyFilter()
    this.setState({
      distance_to_venue: '',
      rating: '',
      price_category: '',
      amenities: ''
    })
  }
  render() {
    const { distance_to_venue, rating, price_category, amenities } = this.state
    return (
      <div className='landingContainer-filterBar'>
        <div>
          Distance (m)
          <input
            name='distance_to_venue'
            value={distance_to_venue}
            onChange={this.handleInput}
          />
        </div>
        <div>
          Rating
          <input
            name='rating'
            value={rating}
            onChange={this.handleInput}
           />
        </div>
        <div>
          Price Category
          <select
            name='price_category'
            value={price_category}
            onChange={this.handleInput}
          >
            <option value="none">N/A</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          Amenities Category
          <select
            name='amenities'
            value={amenities}
            onChange={this.handleInput}
          >
            <option value="none">N/A</option>
            <option value="Free Parking">Free Parking</option>
            <option value="Free Wifi">Free Wifi</option>
            <option value="Pets">Pets</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Gym">Gym</option>
            <option value="Pool">Pool</option>
            <option value="Spa">Spa</option>
          </select>
        </div>
        {
          this.props.filterValues.filtering ? (<button className='landingContainer-filterButton' onClick={this.resetFilters}>Reset Filters</button>) : (
            <button className='landingContainer-filterButton' onClick={this.submitFilterResults}>Filter</button>
          )
        }
      </div>
    )
  }
}

FilterBar = connect(mapStateToProps, mapDispatchToProps)(FilterBar)
export default FilterBar
