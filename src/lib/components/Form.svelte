<script lang="ts">
  export let actionUrl: string
  export let actionName: string
  export let margins: "big" | "normal" = "normal"
</script>

<div class="form" class:big-margins={margins === "big"}><slot></slot></div>
<div class="button-container">
  <a href={actionUrl} class="link">
    <button class="button">{actionName}</button>
  </a>
</div>

<style>
  .form {
    margin: 24px 0;
    padding: 0 12px;
  }
  .form.big-margins {
    margin: 36px 0;
  }
  .button {
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
  .link {
    font-size: inherit;
    color: inherit;
    text-decoration: none;
  }
</style>