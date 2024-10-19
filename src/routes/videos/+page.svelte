<script lang="ts">
  import Form from "$lib/components/Form.svelte"
  import TextField from "$lib/components/TextField.svelte"
  import { encodeString } from "$lib/utils"
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"

  let labelStore = getContext<Writable<string>>("label")
  let label = $labelStore
  
  const getListUrl = (label: string) => {
    if ( label.length < 1 ) {
      return ""
    }
    return `/videos/${encodeString(label)}`
  }
</script>

<Form actionUrl={getListUrl(label)} actionName="find" margins="big">
  <TextField label="video label" bind:value={label} />
</Form>

