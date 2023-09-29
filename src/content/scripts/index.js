import Test from './components/Test.svelte';
import Counter from './components/Counter.svelte';

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
registerComponent(Counter, 'svelte--Counter.svelte');