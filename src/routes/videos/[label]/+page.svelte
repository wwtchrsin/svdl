<script lang="ts">
  import { PUBLIC_FILE_SERVER } from "$env/static/public"
  import { onMount } from "svelte"
  import { decodeString, sleep, getVideoSet, getFileName, truncString } from "$lib/utils"
  import type { File } from "$lib/utils"
  import { page } from "$app/stores"

  let status: "loading" | "loaded" | "error" = "loading"
  let files: File[] = []
  let label = ""

  onMount(async () => {
    await sleep(1000)
    try {
      label = decodeString($page.params.label)
      while ( true ) {
        const response = await getVideoSet(label)
        if ( response.error ) {
          status = "error"
          return
        }
        status = "loaded"
        files = response.files
        await sleep(2000)
      }
    } catch (err) {
      status = "error"
    }
  })

  const getFileStatus = (file: File) => {
    if ( file.error ) return "error"
    if ( !file.url ) return "loading"
    return "loaded"
  }
</script>

<div class="files-container">
  {#if status === "error"}
    <div class="page-error">Error!</div>
  {:else if status === "loading"}
    <div class="page-loading">Loading...</div>
  {:else if !files || !files.length}
    <div class="page-loaded">No files found</div>
  {:else}
    <div class="files">
    {#each files as file, index (file.src + "#" + file.quality)}
      <div class="file-container {getFileStatus(file)}">
        <div class="file">
          <div class="file-status">
            #{index + 1}) <span class="label">source: </span>
            <span class="link-text">
              <span class="inline-landscape">{truncString(file.src, 90)}</span>
              <span class="inline-portrait">{truncString(file.src, 60)}</span>
            </span>
            <span class="label"> quality: </span>{file.quality}
            <span class="label"> status: </span>{getFileStatus(file)}
          </div>
          {#if getFileStatus(file) === "loading"}
            <div class="message">
              <span class="inline-landscape">{truncString(file.message ?? "...", 90)}</span>
              <span class="inline-portrait">{truncString(file.message ?? "...", 60)}</span>
            </div>
          {:else if getFileStatus(file) === "loaded"}
            <div class="message">
              <span class="label">link: </span>
              <a href={`${PUBLIC_FILE_SERVER}/${file.url}`} class="file-link">
                <span class="link-text">
                  <span class="inline-landscape">{truncString(getFileName(file.url), 100)}</span>
                  <span class="inline-portrait">{truncString(getFileName(file.url), 60)}</span>
                </span>
              </a>
            </div>
          {/if}
        </div>
      </div>
    {/each}
    </div>
  {/if}
</div>

<style>
  .files-container {
    max-height: 140px;
    height: 140px;
    overflow-y: scroll;
    background-color: var(--blue-color);
    color: var(--white-color);
  }
  .page-error,
  .page-loading,
  .page-loaded {
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .files {
    font-size: 0.9rem;
    max-height: 100%;
    height: 100%;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
  }
  .file-container {
    display: grid;
    align-items: center;
    height: 100%;
    max-height: 100%;
    padding: 12px 24px;
    box-sizing: border-box;
    overflow: hidden;
    color: var(--white-color);
    scroll-snap-align: start;
  }
  .file-container:nth-child(2n) {
    background-color: rgba(254, 254, 254, 0.1);
  }
  .file .message {
    margin-top: 12px;
  }
  .file-status .label,
  .message .label {
    font-weight: 800;
  }
  .link-text {
    word-break: break-all;
  }
  .file-link {
    color: var(--white-color);
  }
  .inline-portrait {
    display: none;
  }
  .stat-entry .label {
      display: none;
    }
  @media (max-width: 600px) {
    .files {
      font-size: 0.8rem;
    }
    .file-container {
      padding-left: 12px;
      padding-right: 12px;
    }
    .inline-landscape {
      display: none;
    }
    .inline-portrait {
      display: inline;
    }
  }
</style>