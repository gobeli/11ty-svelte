const svelte = require('./src/shortcodes/svelte');

module.exports = function (config) {
  config.addNunjucksAsyncShortcode('svelte', svelte);

  config.addWatchTarget('src/content/scripts/**/*.(js|svelte)')

  return {
    dir: {
      input: 'src/content',
      output: 'dist',
    },
    htmlTemplateEngine: 'njk',
  };
};
