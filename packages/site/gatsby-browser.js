const mock = require('xhr-mock').default;
const { proxy } = require('xhr-mock');
const favorites = require('./mocks/favorites');

exports.onClientEntry = () => {
  mock.setup(); // init

  favorites(mock); // mock favorites

  mock.use(proxy); // use the proxy from xhr-mock
};
