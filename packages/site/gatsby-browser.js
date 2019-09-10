const mock = require('xhr-mock').default;
const { proxy } = require('xhr-mock');
const get = require('lodash.get');
const data = require('./data/organizations-query.json');

const search = (fields, data) => q =>
  !q
    ? data
    : data.filter(
        obj =>
          fields
            .map(field => get(obj, field))
            .filter(
              val => val && val.toLowerCase().indexOf(q.toLowerCase()) > -1
            ).length > 0
      );

const postGet = (url, key, fields, data) => {
  const find = search(fields, data);

  mock.post(url, (req, res) => {
    const params = req
      .body()
      .split('&')
      .reduce((prev, cur) => {
        const [key, value] = cur.split('=');
        prev[key] = value;
        return prev;
      }, {});
    const offset = parseInt(params.offset, 10) || 0;
    const limit = parseInt(params.limit, 10) || 50;
    const list = find(params.q).slice(offset, offset + limit);
    return res.status(200).body(
      JSON.stringify({
        totalCount: data.length,
        count: list.length,
        offset,
        limit,
        [key]: list,
      })
    );
  });
};

exports.onClientEntry = () => {
    mock.setup();

  const fields = ['customerId', 'name', 'dbaName'];
  postGet(
    /\/api\/sdk\/platform\/v1\/organizations\??.*/,
    'organizations',
    fields,
    data
  );

  mock.use(proxy);
};
