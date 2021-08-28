<template>
<div class="page">
  <EventSetting class="event-setting" :tableSetting="currentTableSetting" />
  <HandsTable v-if="!loading" class="hands-table" :tableData="handsTableData"></HandsTable>
  <div v-if="loading && !loadErr" class="loading-box">Loading data...</div>
  <div v-if="loadErr" class="loading-box">Unable to fetch data from server!</div>
</div>
</template>

<script>
import {parseEventsData, isDifferentSetting } from '../utils'
import { mapGetters } from 'vuex';

export default {
  data(){
    return{
      handsTableData: [],
      currentTableSetting: {
            startDate: '2021081800',
            endDate: '2021082800',
            campaignMedium: ''
      },
      loading: true,
      loadErr: false
    }
  },
  mounted(){
    console.log(process.env.BASE_URL)
  },
  async fetch(){
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
        this.$fetch()
      }
    } 
}
}
</script>
<style lang="scss">
.page{
    background-color: #F3F3F3;
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
}
</style>