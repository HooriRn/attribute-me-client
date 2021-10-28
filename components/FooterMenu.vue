<template>
  <div class="footer-container">
    <div class="footer-item">
      <img class="footer-img" :src="getSVGIcon('analytics', 'analytics')" alt="Analytics">
      <nuxt-link class="footer-link" to="/analytics" >Analytics</nuxt-link>
    </div>
    <div class="footer-item">
      <img class="footer-img" :src="getSVGIcon('link-generator', 'link-generator')" alt="link generator">
      <nuxt-link class="footer-link" to="/link-generator" >Link Generator</nuxt-link>
    </div>
    <div class="footer-item">
      <img class="footer-img" :src="getSVGIcon('power-tweeters', 'twitter', true)" alt="power tweeters">
      <a class="footer-link" :class="{'disabled': true}">Power-Tweeters</a>
    </div>
    <div class="footer-item">
      <img class="footer-img" :src="getSVGIcon('skald-marketers', 'skalds', true)" alt="skalds marketers">
      <a class="footer-link" :class="{'disabled': true}">SKALDs</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getSVGIcon(path, route, disable = false) {
      if (disable) {
        return require(`~/assets/img/${path}-disabled.svg`)
      }

      if (this.$route.name == route) {
        return require(`~/assets/img/${path}-selected.svg`)
      }
      else {
        return require(`~/assets/img/${path}-unselected.svg`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 55px;
  min-height: 55px;
  border-top: 1px solid #DADCE0;

  .footer-item {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }

  .footer-img {
    display: block;
    height: 23px;
  }

  .footer-link {
    font-family: 'ProductSans';
    font-size: 10px;
    color: #5f6368;
    text-decoration: none;

    &.disabled {
      color: #DFE0E1
    }
  }

  a.nuxt-link-active {
    color: #fd624f;
  }
}
</style>
