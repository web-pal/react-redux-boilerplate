import fetchMock from 'fetch-mock';
import faker from 'faker';

import config from '../config';


function createFakeResponses() {
  if (config.fakeFetch) {
    fetchMock.restore();
    fetchMock.reset();
    fetchMock.mock(
      `${config.baseUrl}/list`,
      new Promise(res => setTimeout(res, config.fakeDelay)).then(() => {
        const list = [];
        for (let i = 1; i < 301; i += 1) {
          list.push({
            id: i.toString(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
          });
        }
        return list;
      })
    );
  }
}


function getHeaders(checkJWT) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  if (checkJWT) {
    const jwt = window.localStorage.jwt;
    if (jwt) {
      headers.Authorization = `JWT ${jwt}`;
    }
  }

  return headers;
}

export default function myFetch(url, meta = { method: 'GET' }, auth = true) {
  const metaData = { ...meta };
  if (metaData.headers === undefined) {
    metaData.headers = getHeaders(auth);
  }
  createFakeResponses();
  return fetch(url, metaData)
    .then(response => (response.json()));
}
