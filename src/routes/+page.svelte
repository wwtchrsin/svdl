<script lang="ts">
  import Form from "$lib/components/Form.svelte"
  import QualitySelector from "$lib/components/QualitySelector.svelte"
  import TextField from "$lib/components/TextField.svelte"
  import { PUBLIC_APP_NAME } from "$env/static/public"
  import { encodeString } from "$lib/utils"
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"

  type Quality = "high" | "medium" | "low"

  let url = ""
  const label = getContext<Writable<string>>("label")
  const quality = getContext<Writable<string>>("quality") as Writable<Quality>
  
    const getDownloadUrl = (videoUrl: string, quality: Quality, label: string) => {
    const url = videoUrl.trim()
    if ( url.length === 0 ) {
      return ""
    }
    return `/${encodeString(url)}?quality=${quality}` 
      + (label ? `&label=${encodeString(label)}` : "")
  }
</script>

<svelte:head><title>{PUBLIC_APP_NAME}</title></svelte:head>

<Form actionUrl={getDownloadUrl(url, $quality, $label)} actionName="download">
  <TextField label="page url" bind:value={url} />
  <TextField label="video label (optional)" bind:value={$label} optional={true} />
  <QualitySelector bind:quality={$quality} /> 
</Form>