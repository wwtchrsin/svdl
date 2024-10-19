<script lang="ts">
  import { PUBLIC_APP_NAME } from "$env/static/public"
</script>

<div class="header">
  <a href="/videos" class="list-link">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path d="M 10 10 L 90 50 L 10 90 Z" />
    </svg>
  </a>
  <a href="/" class="home-link">{PUBLIC_APP_NAME}</a>
</div>

<style>
  .header {
    padding: 12px;
    display: grid;
    grid-template-columns: 36px auto;
    justify-content: center;
    align-items: center;
    gap: 12px;
    background-color: var(--green-color);
    font-size: 1.6rem;
    width: 100%;
    box-sizing: border-box;
    height: 4.6rem;
  }
  .list-link,
  .home-link {
    color: var(--white-color);
    text-decoration: none;
  }
  .list-link {
    display: block;
    width: 36px;
    height: 36px;
  }
  svg {
    fill: var(--dark-green-color);
    width: 100%;
    height: 100%;
  }
  @media (max-width: 600px) {
    .header {
      grid-template-columns: 24px auto;
      font-size: 1rem;
    }
    .list-link {
      width: 24px;
      height: 24px;
    }
  }
</style>