<template>
  <div>
    <!-- Header Menu for Desktop Devices -->
    <BaseHeader />
    <!-- Main page Content -->
    <Nuxt />
    <!-- Footer Menu for Mobile Devices -->
  </div>
</template>

<script>
import BaseHeader from "/components/BaseHeader.vue";
export default {
  components: {
    BaseHeader,
  },
};
</script>

<style>
</style>
