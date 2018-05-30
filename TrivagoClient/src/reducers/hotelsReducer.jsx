let initialState = {
  hotels: [],
  dataAvailability: false,
  selectedHotel: null,
  selectedRoom: null
}

export const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORING_ALL_HOTELS': {
      return {
        ...state,
        hotels: action.hotels

      }
    }

    case 'SELECTED_HOTEL': {
      return {
        ...state,
        selectedHotel: action.hotel,
        dataAvailability: true
      }
    }

    case 'SELECTED_ROOM': {
      return {
        ...state,
        selectedRoom: action.room,
      }
    }
    default:
      return state
  }
}
