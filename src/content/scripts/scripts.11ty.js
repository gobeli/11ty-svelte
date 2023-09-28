const rollup = require('rollup');
const svelte = require('rollup-plugin-svelte');
const nodeResolve = require('@rollup/plugin-node-resolve');
const path = require('path')

module.exports = class Scripts {
  data () {
    return {
      permalink: '/scripts/index.js',
      eleventyExcludeFromCollections: true,
    }
  }

  async render () {
    const build = await rollup.rollup({
      input: path.join(process.cwd(), 'src', 'content', 'scripts', 'index.js'),
      plugins: [
        svelte({
          compilerOptions: {
            hydratable: true,
          }
        }),
        nodeResolve.default({
          browser: true,
          dedupe: ['svelte'],
        }),
      ]
    });

    const { output: [ main ] } = await build.generate({
      format: 'iife',
    });

    if (main.facadeModuleId) {
      return main.code;
    }
  }
}