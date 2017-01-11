import { normalize, schema } from 'normalizr';
import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';

const habitant = new schema.Entity('habitants');
const city = new schema.Entity('cities', {
  habitants: [habitant]
});

export const getCitiesList = () => (dispatch) => {
  dispatch({ type: types.FETCH_CITIES_STATE, payload: true });

  return fetch(`${config.baseUrl}/cities-list`).then((jsonData) => {
    const response = normalize(jsonData, [city]);

    dispatch({
      type: types.FILL_CITIES_LIST,
      payload: {
        citiesIds: response.result,
        citiesById: response.entities.cities,
        habitantsIds: Object.keys(response.entities.habitants),
        habitantsById: response.entities.habitants
      }
    });

    dispatch({ type: types.FETCH_CITIES_STATE, payload: false });
  });
};

