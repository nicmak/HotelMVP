export const filterActions = (filterValues) => {
  return {
    type: 'FILTERING_HOTELS',
    filtering: true,
    distance_to_venue: filterValues.distance_to_venue,
    rating: filterValues.rating,
    price_category: filterValues.price_category,
    amenities: filterValues.amenities
  }
}
