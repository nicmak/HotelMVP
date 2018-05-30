let initialState = {
  filtering: false,
  distance_to_venue: '',
  rating: '',
  price_category: '',
  amenities: ''
}

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTERING_HOTELS': {
      return {
        ...state,
        filtering: true,
        distance_to_venue: action.distance_to_venue,
        rating: action.rating,
        price_category: action.price_category,
        amenities: action.amenities
      }
    }
    case 'EMPTY_FILTER': {
      return {
        ...state,
        filtering: false,
        distance_to_venue: '',
        rating: '',
        price_category: '',
        amenities: ''
      }
    }
    default:
      return state
  }
}
