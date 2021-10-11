import Vue from 'vue';
import Handsontable from 'handsontable';
const HotTable = !process.client ? null : require('@handsontable/vue').HotTable
const HotColumn = !process.client ? null : require('@handsontable/vue').HotColumn

// import HotTable from '@handsontable/vue'
Vue.mixin({
  components: {
    HotTable,
    HotColumn
  }
})

export default {
  Handsontable
}
