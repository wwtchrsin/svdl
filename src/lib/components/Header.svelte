<script lang="ts">
  import { PUBLIC_APP_NAME } from "$env/static/public"
</script>

<div class="header"><a href="/" class="header-link">{PUBLIC_APP_NAME}</a></div>

<style>
  .header {
    display: grid;
    justify-content: center;
    align-items: center;
    background-color: var(--green-color);
    font-size: 2rem;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    height: 4.6rem;
  }
  .header-link {
    color: var(--white-color);
    text-decoration: none;
  }
  @media (max-width: 600px) {
    .header {
      font-size: 1.2rem;
    }
  }
</style>