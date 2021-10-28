<template>
  <div class="base-header" :class="{ 'mobile-layout': !$device.isDesktop }">
    <div class="menu">
      <div class="menu-item logo">
        <img src="~/assets/img/logo.svg" alt="Attribute me logo" />
      </div>
      <div class="menu-wrapper" v-if="$device.isDesktop">
        <!-- <div class="menu-item">Home</div> -->
        <nuxt-link class="menu-item" to="/analytics">Analytics</nuxt-link>
        <nuxt-link class="menu-item" to="/link-generator">Link Generator</nuxt-link>
        <a class="menu-item" :class="{'disabled': true}">Power-tweeters</a>
        <a class="menu-item" :class="{'disabled': true}">SKALD Marketers</a>
      </div>
      <div class="last-fields" v-if="$route.name == 'analytics'">
        <input @change="quickFilterChanged" v-model="quickFilterValue" class="quick-filter-input" placeholder="Quick Filter" type="text">
        <button @click="exportCSVClicked" class="export-btn">Export</button>
      </div>
      <div class="active-link" v-if="!$device.isDesktop">
        <div class="menu-item menu-item-active" v-if="$route.name == 'analytics'">Analytics</div>
        <div class="menu-item menu-item-active" v-if="$route.name == 'link-generator'">Generator</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   computed: {
        ...mapGetters(['tableSetting'])
    },
    data() {
      return {
        quickFilterValue: ""
      }
    },
    mounted(){
      this.loadLocalQuickFilterValue();
    },
  methods:{
    quickFilterChanged($event){
      console.log("quick filter changed", $event.target.value)
      var filterValue = $event.target.value
      var tableSetting = this.tableSetting
      tableSetting['filters'] = {
        medium: filterValue
      }
      this.$store.commit('tableSetting', tableSetting)
    },
    loadLocalQuickFilterValue(){
      console.log("loadLocalQuickFilterValue")
      var setting = window.localStorage.ANALYTICS_SETTING
      if(setting){
        setting = JSON.parse(setting)
        console.log(setting)
        if(setting.filters && setting.filters.medium){
          this.quickFilterValue = setting.filters.medium
        }
      }
    },
    exportCSVClicked(){
      this.$store.commit('exportCSV', Math.random())
    },
    mobile() {
      const width = window.innerWidth;
      if (width < 900) {
        return 'sm'
      }
      else {
        return 'bg'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-header {
  background-color: #fff;
  border-bottom: 1px solid #dadce0;
  .menu {
    height: 4.3125rem;
    display: flex;
    align-items: center;
    margin-left: 0.8rem;
    font-family: ProductSans;
    font-size: 1rem;
    font-weight: bold;
    color: #000b12;
    min-width: 87.5rem;
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
    .menu-item.disabled {
      color: #757575;
      cursor: default;
    }
    .menu-item-active,
    .nuxt-link-exact-active {
      color: #fd624f;
    }
  }
  .last-fields{
    margin-left: auto;
    padding-right: 1rem;
    .quick-filter-input{
      background: #F3F3F3;
      border: none;
      border-radius: 0.375rem;
      width: 28.1875rem;
      height: 3rem;
      padding: 0.5rem;
      padding-left: 0.625rem;
      &::placeholder{
        color: #757575;
      }
    }
    .export-btn{
      border: none;
      background: #000B12;
      color: #fff;
      width: 7.6875rem;
      height: 3rem;
      border-radius: 0.375rem;
      margin-left: 0.625rem;
      margin-bottom: 1px;
    }
  }
}

.mobile-layout.base-header {
  max-width: 100vw;
}
.mobile-layout {
  .menu {
    min-width: initial;
    height: 54px;
    margin-right: 10px;
    justify-content: space-between;
  }

  .menu-item {
    font-size: 14px;
    margin-right: initial !important;

    img {
    width: 82px;
    }
  }

  .last-fields {
    display: flex;
    align-items: center;
    padding-right: 0;
    margin: 0;
    flex: 1;

    .quick-filter-input {
      width: calc(100%);
      min-width: 120px;
      height: 34px;
      font-size: 14px;
    }

    .export-btn {
      height: 34px;
      width: 60px;
      font-size: 14px;
    }
  }

  .active-link {
    text-align: center;
    padding: 0 10px;
  }
}
</style>
