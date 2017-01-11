import fetchMock from 'fetch-mock';

import config from '../config';
import { generateFakeList, generateFakeCompanies } from '../utils/helpers';


function createFakeResponses() {
  if (config.fakeFetch) {
    fetchMock.restore();
    fetchMock.reset();
    fetchMock.mock(
      `${config.baseUrl}/list`,
      new Promise(res => setTimeout(res, config.fakeDelay)).then(() => (generateFakeList(300)))
    );
    fetchMock.mock(
      `${config.baseUrl}/companies`,
      new Promise(res => res()).then(() => (generateFakeCompanies(5)))
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
