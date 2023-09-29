const path = require("path");
const rollup = require("rollup");
const svelte = require("rollup-plugin-svelte");
const nodeResolve = require("@rollup/plugin-node-resolve");
const css = require("rollup-plugin-css-only");

module.exports = async function svelteShortcode(filename, props) {
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
        emitCss: true,
      }),
      css(),
      nodeResolve.default(),

    ],
  });

  const {
    output: [main],
  } = await build.generate({
    format: "cjs",
    exports: "named",
  });

  if (main.facadeModuleId) {
    const Component = requireFromString(main.code, main.facadeModuleId).default;
    return renderComponent(Component, filename, props);
  }
};

function renderComponent(component, filename, props) {
  return `<style>${component.render(props).css.code}</style>
          <div class="svelte--${filename}" data-props='${JSON.stringify(
    props || {}
  )}'>
            ${component.render(props).html}
          </div>`;
}

function requireFromString(src, filename) {
  const m = new module.constructor();
  m.paths = module.paths;
  m._compile(src, filename);
  return m.exports;
}
