<template>
  <div class="page" :class="{ 'mobile-layout': !$device.isDesktop }">
    <div class="page-layout">
      <div class="side-menu-column">
        <side-menu />
      </div>
      <div v-if="!loading && !loadErr && handsTableData.length !== 0" class="hands-table-column">
        <hands-table v-if="!loading" class="hands-table" :tableData="handsTableData" :totals="handsTableTotals"></hands-table>
      </div>
      <div v-else class="loading-container">
        <div v-if="loading && !loadErr" class="loading-box">
          <div class="loading-text">
            <div id="loading-progress">{{ loadingProgress }}</div>
            <div v-if="whileLoadingMsg" id="loading-msg">{{whileLoadingMsg}}</div>
            <div class="process-msg" v-else>
            This may take a few minutes, or seconds.
            <br>Depends on the size of your date range.
            <br>Even if the animation stops spinning, please just wait.
            <br>We’re working to improve load times.
            </div>
          </div>
          <img src="~/assets/img/loading.gif" alt="loading" />
        </div>
        <div v-if="loadErr" class="loading-box loading-text">
          Unable to fetch data from server!
        </div>
        <div
          v-if="!loading && !loadErr && handsTableData.length === 0"
          class="loading-box loading-text"
        >
          No data in this date range
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  parseEventsData,
  getServerCustomDateString,
  getDateInputValue,
} from "../../../utils";
import { mapGetters } from "vuex";
import SideMenu from "./side-menu.vue";
import HandsTable from './hands-table.vue';

export default {
  head: {
    title: 'Attribute | ',
    meta: [
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Link Generator | " },
      {
        property: "og:description",
        content:
          "THORChain aims to decentralize cryptocurrency liquidity via a network of public THORNodes and ecosystem products. Access to its native and cross-chain liquidity is open to any person, product or institution.",
      },
      { property: "og:url", content: process.env.baseUrl },
      { property: "og:site_name", content: "THORChain" },
      {
        property: "og:image",
        content: process.env.baseUrl + "/images/meta-getting-started.png",
      },
      { property: "og:image:width", content: "876" },
      { property: "og:image:heigh", content: "438" },
      { name: "twitter:creator", content: "@thorchain" },
      { name: "twitter:site", content: "@thorchain" },
      { name: "twitter:title", content: "Link Generator | " },
      {
        name: "twitter:description",
        content:
          "THORChain aims to decentralize cryptocurrency liquidity via a network of public THORNodes and ecosystem products. Access to its native and cross-chain liquidity is open to any person, product or institution.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: process.env.baseUrl + "/images/meta-getting-started.png",
      },
    ],
  },
  components: {
    SideMenu,
    HandsTable
  },
  data() {
    return {
      handsTableData: [],
      handsTableTotals: {},
      currentTableSetting: {
        startDate: null,
        endDate: null,
        daily: true,
      },
      loading: true,
      loadErr: false,
      loadingProgress: '0%',
      whileLoadingMsg: 'Loading data...'
    };
  },
  mounted() {
    var setting = this.loadSetting()
    if(setting.startDate && setting.endDate){
      var startDate = setting.startDate
      var endDate = setting.endDate
    } else{
      var today = new Date();
      // var lastWeek = new Date();
      // lastWeek.setDate(today.getDate() - 7);
      var startDate = getServerCustomDateString(today, "00");
      var endDate = getServerCustomDateString(today, "23");
      this.currentTableSetting.startDate = startDate
      this.currentTableSetting.endDate = endDate

    }
    var dateInputValue = getDateInputValue(startDate, endDate);
    this.$store.commit("sideMenuDateLabel", dateInputValue);
    this.$store.commit("tableSetting", this.currentTableSetting);
  },
  computed: {
    ...mapGetters(["tableSetting"]),
    ...mapGetters(["cool"]),
  },
  watch: {
    tableSetting: function (val) {
      console.log("table setting changed");
      this.currentTableSetting = val;
      console.log('new table setting: ', this.currentTableSetting)
      this.saveSetting(this.currentTableSetting)
      this.getEvents();
      // }
    },
  },
  methods: {
    async getEvents() {
      console.log("get events called");
      this.whileLoadingMsg = 'Loading data...'

      this.loading = true;
      this.loadingProgress = 0;
      this.loadErr = false;
      var self = this;
      var queryString =
      "startDate=" +
      this.currentTableSetting.startDate +
      "&endDate=" +
      this.currentTableSetting.endDate

      if(this.currentTableSetting.filter_website){
        queryString += "&filter_website=" +
        this.currentTableSetting.filter_website
      }
      if(this.currentTableSetting.present_filter){
        queryString += "&present_filter=" +
        this.currentTableSetting.present_filter
      }

      if(this.currentTableSetting.filters && typeof this.currentTableSetting.filters === 'object'){
        queryString += "&filters=" + JSON.stringify(this.currentTableSetting.filters)
      }
      if(this.currentTableSetting.hasOwnProperty('daily')){
        queryString += "&daily=" + this.currentTableSetting.daily
      }
      try {
        var url = process.env.BASE_URL + "/events?" + queryString;
        var res = await self.$axios.get(url, {
          onDownloadProgress: (progressEvent) => {
            const total = progressEvent.total;
            const current = progressEvent.loaded;

            self.loadingProgress = Math.floor((current / total) * 100) + "%";
          },
        });
        var events = res.data.events;
        var totals = res.data.totals;
        self.loadingProgress = 'Processing...'
        self.whileLoadingMsg = null

        setTimeout(() => {
          events = parseEventsData(events);
          self.handsTableData = events;
          self.handsTableTotals = totals;
          self.loading = false;

        }, 0);
      } catch (err) {
        self.loadErr = true;
        console.error(err);
      }
    },
    saveSetting(setting){
      window.localStorage.ANALYTICS_SETTING = JSON.stringify(setting)
    },
    loadSetting(){
      var setting = window.localStorage.ANALYTICS_SETTING
      if(setting){
        setting = JSON.parse(setting)
        this.currentTableSetting = setting
      }
      return this.currentTableSetting
    }
  },

};
</script>
<style lang="scss">
.event-setting {
  margin-bottom: 1.25rem;
}
.loading-box {
  position: relative;
  bottom: 34px; // calculated: ((loading-box height)/2 - (icon height)/2) + 10px
  text-align: center;
  .loading-text{
    .process-msg{
      font-size: 0.8rem;
    }
  }
}
</style>
