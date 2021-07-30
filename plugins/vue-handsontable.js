import Vue from 'vue';
const HotTable = !process.client ? null : require('@handsontable/vue').HotTable
// import HotTable from '@handsontable/vue'
// Vue.use(HotTable)
export default HotTable
// const HotColumn = !process.client ? null : require('@handsontable/vue').HotColumn
// export default HotTable