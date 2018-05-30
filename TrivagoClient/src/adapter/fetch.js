export const fetchAllHotels = () => {
  const url = 'http://localhost:3004/hotels'
  return fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((hotels) => {
      return hotels
    })
    .catch((e) => {
      throw new Error(e)
    })
}

export const fetchHotel = (hotelID) => {
  const url = `http://localhost:3004/hotels?id=${hotelID}`
  return fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((hotels) => {
      return hotels
    })
    .catch((e) => {
      throw new Error(e)
    })
}

export const addHotel = (hotel) => {
  const url = 'http://localhost:3004/hotels'
  return fetch(url, {
    body: JSON.stringify(hotel),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then((response) => {
    console.log('Hotel Made')
    return response.json()
  })
  .catch((e) => {
    throw new Error(e)
  })
}

export const deleteHotel = (hotelID) => {
  const url = `http://localhost:3004/hotels/${hotelID}`
  return fetch(url, {
    method: 'DELETE'
  }).then((response) => {
    console.log('Hotel DELETED')
    return response.json()
  })
    .catch((e) => {
      throw new Error(e)
    })
}







