<script lang="ts">
  export let label: string
  export let value: string
  export let optional = false
</script>

<div class="container" class:optional={optional}>
  <div class="label">{label}:</div>
  <div class="control">
    <input type="text" class="text-field" bind:value={value} 
      placeholder={label} autocomplete="off" />
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
  .optional .label {
    color: var(--grey-color);
  }
  .text-field {
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
  .optional .text-field {
    border-color: var(--grey-color);
    color: var(--grey-color);
  }
  .text-field:focus {
    outline-color: var(--green-color);
  }
  .optional .text-field:focus {
    outline-color: var(--grey-color);
  }
  .text-field::placeholder {
    opacity: 0;
  }
  @media (max-width: 600px) {
    .container {
      grid-template-columns: 1fr;
    }
    .label {
      display: none;
    }
    .text-field {
      font-size: 0.8rem;
    }
    .text-field::placeholder {
      opacity: 0.6;
    }
  }
</style>