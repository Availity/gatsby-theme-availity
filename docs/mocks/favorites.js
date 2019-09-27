module.exports = mock => {
  mock.get(/\/api\/sdk\/platform\/v1\/users\/me/, (req, res) =>
    res.status(200).body(
      window.JSON.stringify({
        id: '1234',
      })
    )
  );

  mock.get(/\/api\/utils\/v1\/settings/, (req, res) =>
    res.status(200).body(
      window.JSON.stringify({
        settings: [
          {
            favorites: [
              {
                id: '1234',
                pos: 0,
              },
            ],
          },
        ],
      })
    )
  );

  // Update the favorites depending on what we sent in
  mock.put(/\/api\/utils\/v1\/settings/, (req, res) => {
    const favoritesUpdate = JSON.parse(req._body);
    return res.status(200).body(
      window.JSON.stringify({
        ...favoritesUpdate,
      })
    );
  });
};
