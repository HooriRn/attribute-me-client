<template>
  <div :class="{ 'layout mobile-layout': !$device.isDesktop }">
    <!-- Header Menu for Desktop Devices -->
    <BaseHeader />
    <!-- Main page Content -->
    <Nuxt />
    <!-- Footer Menu for Mobile Devices -->
    <FooterMenu v-if="!$device.isDesktop" />
  </div>
</template>

<script>
import BaseHeader from "/components/BaseHeader.vue";
export default {
  components: {
    BaseHeader,
  },
  mounted() {
    if (this.$device.isDesktop) {
      document.body.style.minWidth = "1200px"
    }
  }
};
</script>

<style>
html,body,#__nuxt, #__layout{
  height:100%!important;
}

.layout.mobile-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.page.mobile-layout {
  flex: 1;
}
</style>
