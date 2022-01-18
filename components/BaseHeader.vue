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
        <a class="menu-item" :class="{'disabled': true}">Tweet Bot</a>
        <a class="menu-item" :class="{'disabled': true}">Guides</a>
      </div>
      <div class="last-fields" v-if="$route.path == '/analytics'" style="margin-left: 1rem;">
        <input @change="quickFilterChanged" v-model="quickFilterValue" class="quick-filter-input" placeholder="Search by Address" type="text">
        <button @click="searchBtn" class="search-btn">Search</button>
      </div>
      <!--<div class="active-link" v-if="!$device.isDesktop">
        <div class="menu-item menu-item-active" v-if="$route.path == '/analytics'">Analytics</div>
        <div class="menu-item menu-item-active" v-if="$route.path == '/link-generator'">Generator</div>
      </div>-->
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
    searchBtn() {
      let filterValue = this.quickFilterValue;
      let tableSetting = this.tableSetting
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
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    padding-right: 1rem;
    .quick-filter-input{
      flex: 1;
      background: #F3F3F3;
      border: none;
      border-radius: 0.375rem;
      max-width: 28.1875rem;
      height: 3rem;
      padding: 0.5rem;
      padding-left: 0.625rem;
      &::placeholder{
        color: #757575;
      }
    }
    .search-btn{
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

    .search-btn {
      height: 34px;
      width: initial;
      font-size: 14px;
    }
  }

  .active-link {
    text-align: center;
    padding: 0 10px;
  }
}
</style>
