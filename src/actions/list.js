import faker from 'faker';
/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch';
/* eslint-enable no-unused-vars */

export const GET_LIST_START = 'GET_LIST_START';
export const GET_LIST = 'GET_LIST';


export function getList(quantity) {
  return dispatch => {
    dispatch({ type: GET_LIST_START, quantity });
    /*
    fetch(`url`,
      { method: 'METHOD',
        headers: 'HEADERS'
      })
      .then(response => {
      })
      .then(json => {
      });
    */
    setTimeout(() => {
      const list = [];
      for (let i = 0; i < quantity; i++) {
        list.push({
          id: i,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName()
        });
      }
      dispatch({ type: GET_LIST, quantity, list, isFetching: true });
    }, 2000);
    dispatch({ type: GET_LIST_START, quantity, isFetching: false });
  };
}
