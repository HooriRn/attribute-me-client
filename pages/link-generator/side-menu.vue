<template>
  <div class="side-menu">
    <div class="present-filters-filed">
      <div class="field-title">Funnel categories</div>
      <div class="filters-scroll">
        <div
          class="side-menu-item"
          v-for="category of categories"
          :key="categories.indexOf(category)"
        >
          <div class="side-menu-button">{{ category.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          name: "Security",
        },
        {
          name: "Decentralization",
        },
        {
          name: "Swapping",
        },
        {
          name: "Pooling",
        },
        {
          name: "Ecosystem",
        },
      ],
    }
  }
}
</script>
