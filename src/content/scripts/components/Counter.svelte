<script>
  // Define a Svelte component
  let count = 0;

  function increment() {
   count += 1;
  }

  function decrement() {
   count -= 1;
  }
 </script>

 <!-- Define the HTML template for the component -->
 <div class="counter">
  <button on:click={decrement}>-</button>
  <span>{count}</span>
  <button on:click={increment}>+</button>
 </div>

 <style>
  /* Define some styles for the component */
  .counter {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2em;
  }

  button {
   margin: 0 10px;
   background-color: red;
  }
 </style>