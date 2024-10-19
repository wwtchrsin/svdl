<script lang="ts">
  export let quality: "high" | "medium" | "low"
</script>

<div class="container">
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

<style>
  .container {
    margin: 12px 0;
    display: grid;
    grid-template-columns: 140px auto;
    gap: 8px;
    align-items: center;
  }
  .label {
    text-align: center;
    color: var(--green-color);
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
  .inline-portrait {
    display: none;
  }
  @media (max-width: 600px) {
    .container {
      grid-template-columns: 1fr;
    }
    .label {
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