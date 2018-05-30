
const f = require('faker');
f.locale = "en";

const generateRating = (max) => {
  const number = Math.random() * Math.floor(max)
  return Math.round(number * 10) / 10;
}

const categoryRandom = (options) => {
  const randomIndex = Math.floor(Math.random() * (options.length - 1))
  return options[randomIndex]
}

const amenitiesRandom = (options) => {
  const numberOfAmenities = Math.floor(Math.random() * (options.length - 1))
  const amenities = []
  for (let i = 0; i < numberOfAmenities; i++) {
    const item = categoryRandom(options)
    if (!amenities.includes(item)) {
      amenities.push(item)
    }
  }
  return amenities;
}

const randomImages = () => {
  return [
    f.image.city(),
    f.image.nightlife(),
    f.image.people()
  ]
}

const roomData = (hotelName, hotelID) => {
  return {
    id: f.random.uuid(),
    hotelName: hotelName,
    hotelID: hotelID,
    name: `${f.company.companyName()} Suite`,
    description: f.lorem.sentence(),
    max_occupany: Math.floor(f.random.number() / 1000),
    price_in_usd: parseFloat(Math.round(f.random.number()) / 100).toFixed(2)
  }
}
const makeRoomData = (hotelName, hotelID) => {
  const rooms = []
  for (let i = 0; i < 6; i++) {
    rooms.push(roomData(hotelName, hotelID))
  }
  return rooms
}

const fakeHotelData = () => {
  const hotelID = f.random.uuid()
  const hotelName = `${f.company.companyName()} Hotel`
  return {
    id: hotelID ,
    name: hotelName ,
    description: f.lorem.sentence(),
    distance_to_venue: f.random.number(),
    rating: generateRating(5),
    price_category: categoryRandom(['low', 'medium', 'high']),
    amenities: amenitiesRandom(['Free Parking', 'Free Wifi', 'Pets', 'Restaurant', 'Gym', 'Pool', 'Spa']),
    images: randomImages(),
    rooms: makeRoomData(hotelName, hotelID)
  }
}

module.exports = () => {
  const hotelData = { hotels: [] }
  //create fake HotelData
  for (let i = 0; i < 6; i++) {
    hotelData.hotels.push(fakeHotelData())
  }
  return hotelData
}

//ToDOs....
// Bug in amenities, getting doubles, maybe need to flatten or filter the array afterwards

