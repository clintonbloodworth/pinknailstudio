const { v4: uuid } = require('uuid');
const { render } = require('../public/server').default;
const fetch = require('./library/fetch');

module.exports = async (request, response) => {
  const payload = await fetch();
  payload.nonce = Buffer.from(uuid()).toString('base64');

  if (request.headers.accept.startsWith('application/json')) {
    response.json(payload);
  } else {
    const { head, html } = render(payload);

    response.setHeader('cache-control', `s-maxage=${process.env.MAX_AGE}, stale-while-revalidate`);
    response.setHeader('content-security-policy', `default-src 'self'; script-src 'self' 'nonce-${payload.nonce}' www.google-analytics.com maps.googleapis.com; style-src * 'unsafe-inline'; img-src * data:; font-src 'self' fonts.gstatic.com; block-all-mixed-content`);
    response.setHeader('strict-transport-security', 'max-age=31536000; includeSubdomains; preload');
    response.setHeader('x-frame-options', 'SAMEORIGIN');
    response.setHeader('x-content-type-options', 'nosniff');

    response.send(`
      <!doctype html>
      <html lang="en-us">
        <head>${head}</head>
        <body>${html}</body>
      </html>
    `);
  }
};
