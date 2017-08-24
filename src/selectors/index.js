import { createSelector } from 'reselect';
import _ from 'lodash';

const randomPlanetSelector = state => _.get(state, 'planet.randomPlanet');

export const buildRandomPlanet = createSelector(
  randomPlanetSelector,
  planet => {
    if (!planet) return null;
    return {
      name: planet.name,
      population: planet.population,
      terrain: planet.terrain,
      filmCount: planet.films ? planet.films.length : 0,
    };
  }
);
