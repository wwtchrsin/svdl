<script lang="ts">
  import { PUBLIC_APP_NAME } from "$env/static/public"
  import { encodeUrl } from "$lib/utils"
  import Header from "$lib/components/Header.svelte"

  let url = ""
  let quality: "high" | "medium" | "low" = "medium"

  const getDownloadUrl = (videoUrl: string, quality: "high" | "medium" | "low") => {
    const url = videoUrl.trim()
    if ( url.length === 0 ) {
      return "/"
    }
    return "/" + encodeUrl(url) + "/" + quality + "/"
  }
</script>

<svelte:head><title>{PUBLIC_APP_NAME}</title></svelte:head>

<div class="main-container">
  <div class="container">
    <Header></Header>
    <div class="form">
      <div class="form-row">
        <div class="label">page url:</div>
        <div class="control">
          <input type="text" class="src-url" name="url" bind:value={url} placeholder="page url" />
        </div>
      </div>
      <div class="form-row">
        <div class="label">video quality:</div>
        <div class="control quality-selectors">
          <button class="quality-selector" class:selected={quality === "high"}
            on:click={() => {quality = "high"}}>
              <span class="inline-landscape">high</span>
              <span class="inline-portrait">HQ</span>
          </button>
          <button class="quality-selector" class:selected={quality === "medium"}
            on:click={() => {quality = "medium"}}>
              <span class="inline-landscape">medium</span>
              <span class="inline-portrait">MQ</span>
          </button>
          <button class="quality-selector" class:selected={quality === "low"}
            on:click={() => {quality = "low"}}>
              <span class="inline-landscape">low</span>
              <span class="inline-portrait">LQ</span>
          </button>
        </div>
      </div>
    </div>
    <div class="submit-button">
      <a href={getDownloadUrl(url, quality)} 
        class="download-link" target="_blank">
          <button class="download-button">download</button>
      </a>
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
    background-color: var(--white-color);
    border-radius: 6px;
    overflow: hidden;
    border: 2px solid var(--white-color);
  }
  .form {
    margin: 24px 0;
    padding: 0 12px;
  }
  .form-row {
    margin: 12px 0;
    display: grid;
    grid-template-columns: 140px auto;
    gap: 8px;
    align-items: center;
  }
  .form-row .label {
    text-align: center;
    color: var(--green-color);
  }
  .src-url {
    padding: 6px;
    font-size: 0.9rem;
    background-color: var(--white-color);
    color: var(--green-color);
    border: 1px solid var(--green-color);
    border-radius: 6px;
    box-sizing: border-box;
    width: 100%;
    outline: 2px solid transparent;
  }
  .src-url:focus {
    outline-color: var(--green-color);
  }
  .src-url::placeholder {
    opacity: 0;
  }
  .quality-selectors {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .quality-selector {
    padding: 6px 0;
    font-size: 1rem;
    border-radius: 6px;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    border: 1px solid transparent;
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--green-color);
  }
  .quality-selector.selected {
    border-color: var(--green-color);
  }
  .download-button {
    cursor: pointer;
    padding: 12px 0;
    font-size: 1.2rem;
    background-color: var(--green-color);
    color: var(--white-color);
    border-width: 0;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
  }
  .download-link {
    font-size: inherit;
    color: inherit;
    text-decoration: none;
  }
  .inline-portrait {
    display: none;
  }
  @media (max-width: 600px) {
    .container {
      width: 300px;
    }
    .src-url {
      font-size: 0.8rem;
    }
    .src-url::placeholder {
      opacity: 0.6;
    }
    .form-row {
      grid-template-columns: 1fr;
    }
    .form-row .label {
      display: none;
    }
    .quality-selector {
      font-size: 0.9rem;
    }
    .inline-landscape {
      display: none;
    }
    .inline-portrait {
      display: inline;
    }
  }
</style>