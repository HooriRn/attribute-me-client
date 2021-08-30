<template>
<div class="page">
  <div class="page-layout">
    <div class="side-menu-column">
      <SideMenu />
    </div>
    <div class="hands-table-column">
      <HandsTable v-if="!loading" class="hands-table" :tableData="handsTableData"></HandsTable>
      <div v-if="loading && !loadErr" class="loading-box">
        <div>{{loadingProgress}}%</div>
        <div>
        Loading data...
        </div>
      </div>
      <div v-if="loadErr" class="loading-box">Unable to fetch data from server!</div>
      <div v-if="!loading && !loadErr && handsTableData.length === 0" class="loading-box">No data in this date range</div>
      
    </div>
  </div>
</div>
</template>

<script>
import {parseEventsData, isDifferentSetting, getServerCustomDateString, getDateInputValue } from '../utils'
import { mapGetters } from 'vuex';
import SideMenu from "../components/SideMenu"
export default {
  components:{
    SideMenu
  },
  data(){
    return{
      handsTableData: [],
      currentTableSetting: {
            startDate: '2021081800',
            endDate: '2021082800',
            campaignMedium: ''
      },
      loading: true,
      loadErr: false,
      loadingProgress: 0
    }
  },
  mounted(){

        var today = new Date()
        var lastWeek = new Date()
        lastWeek.setDate(today.getDate() - 7)

        var startDate = getServerCustomDateString(lastWeek, "01")
        var endDate = getServerCustomDateString(today, "23")

        var dateInputValue = getDateInputValue(startDate, endDate)
        this.$store.commit('sideMenuDateLabel', dateInputValue)
        this.$store.commit('cool', true)
        this.$store.commit('handTableSetting', {
            startDate: startDate,
            endDate: endDate,
            campaignMedium: ''
        })
    },
  async fetch(){
    return;
    this.loading = true
    this.loadErr = false
    var self = this
    var queryString = "startDate="+this.currentTableSetting.startDate
    + "&endDate="+this.currentTableSetting.endDate
    + "&campaignMedium=" + this.currentTableSetting.campaignMedium
    var events
    try{

      var url = process.env.BASE_URL + "/events?"+queryString
      console.log(url)
      events = await fetch(url)
      events = await events.json()
      events = parseEventsData(events)
      console.log(events)
      self.handsTableData = events
      self.loading = false
    }
    catch(err){
      self.loadErr = true
      console.error(err)
    }

  },
  fetchOnServer: false,
  computed:{
    ...mapGetters(['handTableSetting']),
    ...mapGetters(['cool'])
  },
  watch: {
    handTableSetting: function(val) {
      console.log('table setting changed')
      console.log(this.currentTableSetting)
      var {isDifferent, newSetting} = isDifferentSetting(this.currentTableSetting, val)
      console.log(newSetting)
      if(isDifferent){
        console.log('newData')
        this.currentTableSetting = newSetting
        this.getEvents()
      }
    } 
},
methods:{
  async getEvents(){
    console.log("get events called")

    this.loading = true
    this.loadingProgress = 0
    this.loadErr = false
    var self = this
    var queryString = "startDate="+this.currentTableSetting.startDate
    + "&endDate="+this.currentTableSetting.endDate
    + "&campaignMedium=" + this.currentTableSetting.campaignMedium

    try{

      var url = process.env.BASE_URL + "/events?"+queryString
      var res = await self.$axios.get(url, {
        onDownloadProgress: progressEvent => {
          const total = progressEvent.total
          const current = progressEvent.loaded

          self.loadingProgress = Math.floor(current / total * 100)
        }
      })
      var events = res.data
      events = parseEventsData(events)
      self.handsTableData = events
      self.loading = false

    }
    catch(err){
      self.loadErr = true
      console.error(err)
    }
  }
}
}
</script>
<style lang="scss">
body{
  background-color: #F3F3F3;
  height: 100vh;
}
.page{
    padding: 1.25rem;
    .page-layout{
      display: flex;
      .side-menu-column{
        min-width: 11.875rem;
        max-width: 11.875rem;
        max-height: calc(100vh - 7rem);
        // overflow-y: scroll;
        // overflow-x: unset;
      }
      .hands-table-column{
        width: calc(100vw - 11.875rem);
    }
    }
}
.hands-table{
  .handsontable{
  margin: 0 auto;

  }
}
.event-setting{
  margin-bottom: 20px;
}
.loading-box{
  text-align: center;
  margin-top: 4rem;
}
</style>