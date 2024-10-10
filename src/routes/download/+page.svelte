<script lang="ts">
  import { PUBLIC_APP_NAME } from "$env/static/public"
  import Header from "$lib/components/Header.svelte"
  import { getVideoUrl, getFileName } from "$lib/utils"
  import { onMount } from "svelte";
  import type { PageData } from "./$types"

  export let data: PageData
  let url: string | undefined
  let status: "error" | "loading" | "loaded" | "init" = "init"

  onMount(async () => {
    if ( !data.uid ) {
      status = "error"
      return
    }
    status = "loading"
    try {
      url = await getVideoUrl(data.uid)
      status = url ? "loaded" : "error"
    } catch (err) {
      status = "error"
    }
  })
</script>

<svelte:head><title>Download / {PUBLIC_APP_NAME}</title></svelte:head>

<div class="main-container">
  <div class="container">
    <Header></Header>
    <div class="status" class:error={status === "error"} class:init={status === "init"}>
      {#if status === "loading"}
        <div class="status-label">status:</div>
        <div class="status-value">Loading...</div>
      {:else if status === "error"}
        <div class="status-label">status:</div>
        <div class="status-value">Error!</div>
      {:else if status === "loaded"}
        <div class="status-label">link</div>
        <div class="status-value">
          <a href={url} class="video-link">{getFileName(url)}</a>
        </div>
      {:else}
        <div class="status-label">status:</div>
        <div class="status-value">---</div>
      {/if}
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
  .video-link {
    color: var(--white-color);
  }
</style>