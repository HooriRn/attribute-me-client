<template>
  <div class="side-menu">
    <div class="present-filters-filed" v-if="$device.isDesktop">
      <div class="field-title">Products</div>
      <div class="filters-scroll">
        <div
          class="side-menu-item"
          v-for="(category, index) of categories"
          :key="categories.indexOf(category)"
        >
          <div class="side-menu-button" :class="{'disabled': category.disabled, 'side-menu-button-active': active === index}">{{ category.name }}</div>
        </div>
      </div>
    </div>
    <div class="filter-options" v-else>
      <div class="filter-option date-picker">
        <div class="filter-name">Products:</div>
        <b-dropdown id="preset-filters" variant="outline" text="Dropdown with header" class="drop-down-custom" no-caret>
          <template #button-content>
            {{"THORChain.org"}}
            <div class="arrow-down"></div>
          </template>
          <div>
            <b-dropdown-item-button
              aria-describedby="funnel-categories-label"
            >
              THORChain.org
            </b-dropdown-item-button>
            <b-dropdown-item-button
              aria-describedby="funnel-categories-label"
              disabled
            >
              SKIP.exchange
            </b-dropdown-item-button>
          </div>
        </b-dropdown>
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
          name: "THORChain.org",
          disabled: false
        },
        {
          name: "SKIP.exchange",
          disabled: true
        },
      ],
      active: 0
    }
  }
}
</script>
