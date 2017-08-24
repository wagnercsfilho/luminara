const initialState = {
  randomPlanet: null,
  favoritePlanets: null,
  isRandomPlanetRequesting: false,
  isFavoritePlanetsRequesting: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'RANDOM_PLANET_REQUEST':
      return { ...state, ...action.payload };
    case 'RANDOM_PLANET_REQUEST_SUCCESS':
      return { ...state, ...action.payload };
    case 'RANDOM_PLANET_REQUEST_ERROR':
      return { ...state, ...action.payload };
    case 'FAVORITE_PLANETS_REQUEST':
      return { ...state, ...action.payload };
    case 'FAVORITE_PLANETS_REQUEST_SUCCESS':
      return { ...state, ...action.payload };
    case 'FAVORITE_PLANETS_REQUEST_ERROR':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
