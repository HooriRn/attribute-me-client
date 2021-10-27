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
            <div>{{ loadingProgress }}%</div>
            <div>Loading data...</div>
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
  isDifferentSetting,
  getServerCustomDateString,
  getDateInputValue,
  parseTotalsData,
} from "../../utils";
import { mapGetters } from "vuex";
import SideMenu from "./side-menu.vue";
import HandsTable from './hands-table.vue';

export default {
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
      loadingProgress: 0,
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
      var startDate = getServerCustomDateString(today, "01");
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

            self.loadingProgress = Math.floor((current / total) * 100);
          },
        });
        var events = res.data.events;
        var totals = res.data.totals;

        events = parseEventsData(events);
        // if(events.length > 0){
        //   totals = parseTotalsData(totals)
        //   var oneEvent = JSON.parse(JSON.stringify(events[0]))

        //   for(var key in oneEvent)
        //     oneEvent[key] = null
        //   if(oneEvent.hasOwnProperty('device_category'))
        //     oneEvent.device_category = "Totals"
        //   oneEvent.event_count = totals.total_count
        //   oneEvent.event_value = totals.total_value
        //   // oneEvent.total_users = totals.total_total_users
        //   // oneEvent.event_count_per_user = totals.total_event_count_per_user
        //   events.unshift(oneEvent)
        // }
        console.log(events)
        self.handsTableData = events;
        self.handsTableTotals = totals;
        self.loading = false;
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
}
</style>
