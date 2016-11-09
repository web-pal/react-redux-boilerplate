module.exports = {
  fakeFetch: true,
  fakeDelay: process.env.NODE_ENV === 'test' ? 0 : 2000,
  baseUrl: 'https://sample-api.com:/api',
};
