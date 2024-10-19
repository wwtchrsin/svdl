<script lang="ts">
  import { PUBLIC_APP_NAME, PUBLIC_FILE_SERVER } from "$env/static/public"
  import { checkVideoStatus, sleep, getFileName, getVideoId, decodeString, truncString } 
    from "$lib/utils"
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let url: string = ""
  let status: "error" | "loading" | "loaded" | "init" = "init"
  let message = ""
  const statusText = {
    "error": "Error!",
    "loading": "Loading...",
    "loaded": "Done.",
    "init": "..."
  }

  onMount(async () => {
    let quality = $page.url.searchParams.get("quality")
    let encodedLabel = $page.url.searchParams.get("label")
    if ( !quality || !["high", "medium", "low"].includes(quality) ) {
      quality = "medium"
    }
    await sleep(1000)
    try {
      const label = encodedLabel ? decodeString(encodedLabel) : undefined
      const decodedUrl = decodeString($page.params.url)
      const uid = await getVideoId(decodedUrl, quality as "high" | "medium" | "low", label)
      if ( !uid ) {
        status = "error"
        return
      }
      status = "loading"
      for ( let i=0; 1 < 1000; i += 2 ) { 
        await sleep(2000)
        const response = await checkVideoStatus(uid)
        if ( response.error ) {
          status = "error"
          return
        }
        message = response.message ?? ""
        if ( response.url ) {
          url = `${PUBLIC_FILE_SERVER}/${response.url}`
          status = "loaded"
          return
        }
      }
    } catch (err) {}
    status = "error"
  })
</script>

<svelte:head><title>Download / {PUBLIC_APP_NAME}</title></svelte:head>

<div class="content">
  {#if status === "loading" && message || status === "loaded"}
    <div class="message">
      <div>
        {#if status === "loading"}
          <span class="inline-landscape">{truncString(message, 120)}</span>
          <span class="inline-portrait">{truncString(message, 60)}</span>
        {:else if status === "loaded"}
          <a href={url} class="video-link">
            <span class="inline-landscape">{truncString(getFileName(url), 120)}</span>
            <span class="inline-portrait">{truncString(getFileName(url), 60)}</span>
          </a>
        {/if}
      </div>
    </div>
  {:else}
    <div class="status" class:error={status === "error"}>
      <div class="status-label">status:</div>
      <div class="status-value">{statusText[status]}</div>
    </div>
  {/if}
</div>

<style>
  .content {
    height: 4.6rem;
  }
  .status {
    display: grid;
    grid-template-columns: 1fr 2fr;
    background-color: var(--green-color);
    color: var(--white-color);
    text-align: center;
    font-size: 1rem;
    height: 100%;
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
    height: 100%;
  }
  .status-label {
    background-color: rgba(254, 254, 254, 0.2);
  }
  .status-value {
    background-color: rgba(254, 254, 254, 0.4);
  }
  .message {
    padding: 12px 24px;
    box-sizing: border-box;
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: var(--blue-color);
    color: var(--white-color);
    font-size: 0.8rem;
    overflow: hidden;
    text-align: center;
  }
  .message > div {
    max-width: 100%;
    word-break: break-all;
  }
  .video-link {
    color: var(--white-color);
  }
  .inline-portrait {
    display: none;
  }
  @media (max-width: 600px) {
    .inline-landscape {
      display: none;
    }
    .inline-portrait {
      display: inline;
    }
  }
</style>