<template></template>

<script>
/* Not yet designed. It will redirect to the analytics page */
export default {
  middleware: [
    function ({ redirect }) {
      redirect("/analytics");
    },
  ],
};
</script>

<style>
</style>
