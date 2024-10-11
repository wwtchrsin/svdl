<script lang="ts">
  import { PUBLIC_APP_NAME } from "$env/static/public"
</script>

<div class="header"><a href="/" class="header-link">{PUBLIC_APP_NAME}</a></div>

<style>
  .header {
    padding: 16px;
    background-color: var(--green-color);
    font-size: 2em;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }
  .header-link {
    color: var(--white-color);
    text-decoration: none;
  }
</style>