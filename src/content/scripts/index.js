import Test from './components/Test.svelte';

function registerComponent (component, name) {
  document.querySelectorAll(`.${CSS.escape(name)}`).forEach($el => {
    const props = JSON.parse($el.dataset.props);
    new component({
      target: $el,
      props,
      hydrate: true
    })
  })
}

registerComponent(Test, 'svelte--Test.svelte');
