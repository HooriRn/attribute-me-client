<template>
  <div class="base-header">
    <div class="menu">
      <div class="menu-item logo">
        <img src="~/assets/img/logo.svg" alt="Attribute me logo" />
      </div>
      <!-- <div class="menu-item">Home</div> -->
      <nuxt-link class="menu-item" to="/">Analytics</nuxt-link>
      <nuxt-link class="menu-item" to="/linkGenerator"
        >Link Generator</nuxt-link
      >
      <div class="menu-item">Power-tweeters</div>
      <div class="menu-item">SKALD Marketers</div>
      <div class="last-fields">
        <input @change="quickFilterChanged" v-model="quickFilterValue" class="quick-filter-input" placeholder="Filter by Campaign Medium" type="text">
        <button @click="exportCSVClicked" class="export-btn">Export .csv</button>
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
    data(){
      return {
        quickFilterValue: ""
      }
    },
    mounted(){
      this.loadLocalQuickFilterValue()
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
    }
  }
};
</script>

<style lang="scss">
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
</style>
