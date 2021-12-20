<template>
  <div class="footer-container">
    <div class="footer-item" @click="$router.push('/thorchain/analytics')">
      <img class="footer-img" :src="getSVGIcon('analytics', 'thorchain-analytics')" alt="Analytics">
      <nuxt-link class="footer-link" to="/thorchain/analytics" >Analytics</nuxt-link>
    </div>
    <div class="footer-item" @click="$router.push('/thorchain/link-generator')">
      <img class="footer-img" :src="getSVGIcon('link-generator', 'thorchain-link-generator')" alt="link generator">
      <nuxt-link class="footer-link" to="/thorchain/link-generator" >Link Generator</nuxt-link>
    </div>
    <div class="footer-item">
      <img class="footer-img" :src="getSVGIcon('power-tweeters', 'twitter', true)" alt="Tweet Bot">
      <a class="footer-link" :class="{'disabled': true}">Tweet Bot</a>
    </div>
    <div class="footer-item">
      <img class="footer-img" :src="getSVGIcon('skald-marketers', 'skalds', true)" alt="skalds marketers">
      <a class="footer-link" :class="{'disabled': true}">Guides</a>
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

      console.log(route, this.$route.name)
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
  background: #fff;
  z-index: 1000;
  position: fixed;
  bottom: 0;
  width: 100%;

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
