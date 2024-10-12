<script lang="ts">
  import { PUBLIC_APP_NAME } from "$env/static/public"
  import { encodeUrl } from "$lib/utils"
  import Header from "$lib/components/Header.svelte"

  let url = ""
</script>

<svelte:head><title>{PUBLIC_APP_NAME}</title></svelte:head>

<div class="main-container">
  <div class="container">
    <Header></Header>
    <div class="controls">
      <input type="text" class="src-url" name="url" bind:value={url} placeholder="video url"/>
      <button class="button-download">
        <a href="/download?url={encodeUrl(url)}" class="download-link" target="_blank">
          download
        </a>
      </button>
    </div>
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
  }
  .controls {
    display: grid;
    grid-template-columns: auto 100px;
    margin: 12px 0;
    width: 100%;
    gap: 8px;
  }
  .src-url {
    padding: 6px;
    font-size: 1.2rem;
    background-color: var(--white-color);
    color: var(--green-color);
    border: 1px solid var(--green-color);
    border-radius: 6px;
  }
  .button-download {
    background-color: var(--green-color);
    color: var(--white-color);
    border-width: 0;
    font-size: 1rem;
    border-radius: 6px;
  }
  .download-link {
    font-size: inherit;
    color: inherit;
    text-decoration: none;
  }
  @media (max-width: 600px) {
    .container {
      width: 300px;
    }
    .controls {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      border-radius: 6px;
      overflow: hidden;
      gap: 0;
    }
    .button-download {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    .src-url {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      font-size: 0.8rem;
    }
  }
</style>