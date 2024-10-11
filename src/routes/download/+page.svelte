<script lang="ts">
  import { PUBLIC_APP_NAME, PUBLIC_SERVER_ADDR } from "$env/static/public"
  import Header from "$lib/components/Header.svelte"
  import { checkVideoStatus, sleep, getFileName } from "$lib/utils"
  import { onMount } from "svelte";
  import type { PageData } from "./$types"

  export let data: PageData
  let url: string | undefined
  let status: "error" | "loading" | "loaded" | "init" = "init"
  let message = ""
  const statusText = {
    "error": "Error!",
    "loading": "Loading...",
    "loaded": "Done.",
    "init": "..."
  }

  onMount(async () => {
    if ( !data.uid ) {
      status = "error"
      return
    }
    status = "loading"
    for ( let i=0; 1 < 1000; i += 2 ) { 
      const response = await checkVideoStatus(data.uid)
      if ( response.error ) {
        status = "error"
        return
      }
      message = response.message ?? ""
      if ( response.url ) {
        url = `${PUBLIC_SERVER_ADDR}/${response.url}`
        status = "loaded"
        return
      }
      await sleep(2000)
    }
    status = "error"
  })
</script>

<svelte:head><title>Download / {PUBLIC_APP_NAME}</title></svelte:head>

<div class="main-container">
  <div class="container">
    <Header></Header>
    <div class="status" class:error={status === "error"} class:init={status === "init"}>
      <div class="status-label">status:</div>
      <div class="status-value">{statusText[status]}</div>
    </div>
    <div class="message" class:loading={status === "loading" && message} 
      class:loaded={status === "loaded"}>
        <div>
          {#if status === "loading"}
            {message}
          {:else if status === "loaded"}
            <a href={url} class="video-link">{getFileName(url)}</a>
          {/if}
        </div>
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
  .status {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 6px 0;
    background-color: var(--green-color);
    color: var(--white-color);
    text-align: center;
    font-size: 1rem;
    border-radius: 6px;
  }
  .status.init {
    visibility: hidden;
  }
  .status.error {
    background-color: var(--red-color);
  }
  .status-label,
  .status-value {
    display: grid;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    box-sizing: border-box;
    overflow: hidden;
    height: 120px;
  }
  .status-label {
    background-color: rgba(254, 254, 254, 0.2);
  }
  .status-value {
    background-color: rgba(254, 254, 254, 0.4);
  }
  .message {
    visibility: hidden;
    display: grid;
    justify-content: center;
    align-items: center;
    height: 4.6rem;
    background-color: var(--blue-color);
    color: var(--white-color);
    border-radius: 6px;
    font-size: 0.8rem;
    overflow: hidden;
  }
  .message.loading,
  .message.loaded {
    visibility: visible;
  }
  .video-link {
    color: var(--white-color);
  }
</style>