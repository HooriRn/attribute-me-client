<template>
  <div class="base-header">
    <div class="menu">
      <div class="menu-item logo">
        <img src="~/assets/img/logo.svg" alt="Attribute me logo" />
      </div>
      <div class="menu-item">Home</div>
      <nuxt-link class="menu-item" to="/">Analytics</nuxt-link>
      <nuxt-link class="menu-item" to="/linkGenerator"
        >Link Generator</nuxt-link
      >
      <div class="menu-item">Power-tweeters</div>
      <div class="menu-item">SKALD Marketers</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.base-header {
  background-color: #fff;
  .menu {
    height: 4.3125rem;
    display: flex;
    align-items: center;
    margin-left: 0.8rem;
    font-family: ProductSans;
    font-size: 1rem;
    font-weight: bold;
    color: #000b12;
    .menu-item {
      color: #000b12;
      text-decoration: none;
      margin-right: 2.5rem;
      cursor: pointer;
      &:first-child {
        margin-right: 2.4rem;
      }
      &:hover {
        color: #fd624f;
      }
    }
    .menu-item-active,
    .nuxt-link-exact-active {
      color: #fd624f;
    }
  }
  border-bottom: 1px solid #dadce0;
}
</style>
