module.exports = {
  NOT_FOUND: {
    code: 404,
    text: text => ({
      message: `404 Not found ${text}`
    })
  },
  URL: { code: 404, text: text => ({ message: `404 Not found url: ${text}` }) },
  BAD_REQUEST: {
    code: 400,
    text: text => ({ message: `400 Bad request ${text}` })
  },
  ACCESS: {
    code: 401,
    text: () => ({ message: '401 Access token is missing or invalid' })
  },
  INCORRECT: {
    code: 403,
    text: text => ({ message: `403 Incorrect login or password ${text}` })
  },
  SERVER: { code: 500, text: () => ({ message: '500 Internal server error' }) }
};
