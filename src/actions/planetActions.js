import axios from 'axios';
import firebase from 'firebase';
import uuid from 'uuid/v1';
import _ from 'lodash';

const randomPlanetRequest = () => ({
  type: 'RANDOM_PLANET_REQUEST',
  payload: { isRandomPlanetRequesting: true, }
});

const randomPlanetRequestError = () => ({
  type: 'RANDOM_PLANET_REQUEST_ERROR',
  payload: { isRandomPlanetRequesting: false, }
});

const randomPlanetRequestSuccess = (randomPlanet) => ({
  type: 'RANDOM_PLANET_REQUEST_SUCCESS',
  payload: { randomPlanet, isRandomPlanetRequesting: false }
});

const favoritePlanetsRequest = () => ({
  type: 'FAVORITE_PLANETS_REQUEST',
  payload: { isFavoritePlanetsRequesting: true, }
});

const favoritePlanetsRequestError = () => ({
  type: 'FAVORITE_PLANETS_REQUEST_ERROR',
  payload: { isFavoritePlanetsRequesting: false, }
});

const favoritePlanetsRequestSuccess = (favoritePlanets) => ({
  type: 'FAVORITE_PLANETS_REQUEST_SUCCESS',
  payload: { favoritePlanets, isFavoritePlanetsRequesting: false }
});

const favoritePlanetsCreate = () => ({
  type: 'FAVORITE_PLANET_CREATE',
  payload: { isFavoritePlanetsCreating: true, }
});

const favoritePlanetsCreateError = () => ({
  type: 'FAVORITE_PLANET_CREATE_ERROR',
  payload: { isFavoritePlanetsCreating: false, }
});

const favoritePlanetsCreateSuccess = () => ({
  type: 'FAVORITE_PLANET_CREATE_SUCCESS',
  payload: { sFavoritePlanetsCreating: false }
});

export const getRandomPlanet = () => async dispatch => {
  try {
    dispatch(randomPlanetRequest());
    const planetId = getRandomInt(1, 61);
    const result = await axios.get(`planets/${planetId}`);
    dispatch(randomPlanetRequestSuccess(result.data))
  } catch (e) {
    dispatch(randomPlanetRequestError(e.message));
  }
};

export const addFavoritePlanets = (planet) => async dispatch => {
  try {
    dispatch(favoritePlanetsCreate());
    const userId = localStorage.getItem('userId');
    if (!userId) localStorage.setItem('userId', uuid());
    const ref = firebase.database().ref();
    const planetKey = ref.child('favorites').child(userId).push().key;
    await ref.child('favorites').child(userId).child(planetKey).set({ ...planet, id: planetKey });
    alert('Planet added to favorites');
    dispatch(favoritePlanetsCreateSuccess());
  } catch (e) {
    console.log(e);
    dispatch(favoritePlanetsCreateError(e.message));
  }
}

export const getFavoritePlanets = () => async dispatch => {
  try {
    dispatch(favoritePlanetsRequest());
    const userId = localStorage.getItem('userId');
    if (!userId) localStorage.setItem('userId', uuid());
    const ref = firebase.database().ref();
    const snap = await ref.child('favorites').child(userId).once('value');
    const result = (snap && snap.val()) || {};
    const planets = _.values(result);
    dispatch(favoritePlanetsRequestSuccess(planets))
  } catch (e) {
    dispatch(favoritePlanetsRequestError(e.message));
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
