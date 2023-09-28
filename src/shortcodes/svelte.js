const path = require("path");
const rollup = require("rollup");
const svelte = require("rollup-plugin-svelte");
const nodeResolve = require('@rollup/plugin-node-resolve');

module.exports = async function svelteShortcode(filename, props) {
  // find the component which is requested
  const input = path.join(
    process.cwd(),
    "src",
    "content",
    "scripts",
    "components",
    filename
  );

  // create the rollup ssr build
  const build = await rollup.rollup({
    input,
    plugins: [
      svelte({
        compilerOptions: {
          generate: "ssr",
          hydratable: true,
        },
      }),
      nodeResolve.default({
        browser: false,
        dedupe: ['svelte'],
      }),
    ],
  });

  // generate the bundle
  const {
    output: [main],
  } = await build.generate({
    format: "cjs",
    exports: 'named',
  });


  if (main.facadeModuleId) {
    const Component = requireFromString(main.code, main.facadeModuleId).default;
    return renderComponent(Component, filename, props);
  }
};

function renderComponent(component, filename, props) {
  return `
    <div class="svelte--${filename}" data-props='${JSON.stringify(props || {})}'>
      ${component.render(props).html}
    </div>
  `
}

function requireFromString(src, filename) {
  const m = new module.constructor()
  m.paths = module.paths
  m._compile(src, filename)
  return m.exports
}