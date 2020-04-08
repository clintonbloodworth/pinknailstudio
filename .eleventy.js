module.exports = configuration => {
  configuration.addPassthroughCopy('source/admin/config.yml');
  configuration.addPassthroughCopy({ 'source/assets': '/' });
};
