<script lang="ts">
  import "../global.css"
  import Header from "$lib/components/Header.svelte"
  import { setContext } from "svelte"
  import { createStore } from "$lib/stores"
  import type { LayoutServerData } from "./$types.js"

  export let data: LayoutServerData
  setContext("label", createStore("label", data.label))
  setContext("quality", createStore("quality", data.quality))
</script>

<div class="main-container">
  <div class="container">
    <Header></Header>
    <slot></slot>
  </div>
</div>

<style>
  .main-container {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .container {
    width: 480px;
    background-color: var(--white-color);
    border-radius: 6px;
    overflow: hidden;
    border: 2px solid var(--white-color);
  }
  @media (max-width: 600px) {
    .container {
      width: 300px;
    }
  }
</style>