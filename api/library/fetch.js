const contentful = require('contentful');

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  space: process.env.CONTENTFUL_SPACE,
});

module.exports = () => client
  .getEntries()
  .then((entries) => {
    const parsed = client.parseEntries(entries);

    const general = parsed.items
      .filter((item) => item.sys.contentType.sys.id === 'general')
      .map((general) => general.fields)[0];

    const images = parsed.items
      .filter((item) => item.sys.contentType.sys.id === 'images')
      .map((store) => {
        store.fields.carousel = store.fields.carousel.map((image) => image.fields.file.url.replace(/^\/\//, 'https://'));

        store.fields.logo = store.fields.logo.fields.file.url.replace(/^\/\//, 'https://');
        return store.fields;
      })[0];

    const services = parsed.items
      .filter((item) => item.sys.contentType.sys.id === 'services')
      .sort((a, b) => (a.fields.order <= b.fields.order ? -1 : 1))
      .map((service) => {
        service.fields.items = service.fields.items.map((service) => service.fields);
        delete service.fields.order;
        return service.fields;
      });

    const store = parsed.items
      .filter((item) => item.sys.contentType.sys.id === 'store')
      .map((store) => {
        store.fields.hours = store.fields.hours.map((hours) => hours.fields);
        return store.fields;
      })[0];

    return {
      general,
      images,
      services,
      store,
    };
  });
