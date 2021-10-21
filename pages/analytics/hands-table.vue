<template>
  <hot-table v-if="tableData.length > 0" :settings="settings" :data="tableData" ref="hotTable"></hot-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
  ...mapGetters(['exportCSV'])
  },
  props: {
    tableData: {
      type: Array,
      default(){
        return [
          ["", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13]
        ]
      }
    },
    totals: {
      type: Object,
      default(){
        return {
            total_count: 10,
            total_value: 20,
            total_total_users: 30,
            total_event_count_per_user: 40
          }

      }
    }
  },
  data: function() {
    return {
      settings: {
        colHeaders: [
          'Date & Hour',
          'Device Category',
          'Host Name',
          'Page Path',
          'Page Referrer',
          'Campaign Medium',
          'Campaign Name',
          'Campaign Source',
          'Event Name',
          'Event Category',
          'Event Label',
          'Event Count',
          'Event Value'
        ],
        rowHeaders: true,
        licenseKey: 'non-commercial-and-evaluation',
        height: this.$device.isDesktop? 'calc( 100vh - 5.5625rem )' : '100%',
        width: '100%',
        stretchH: 'all',
        overflow: 'hidden',
        readOnly: true,
        dropdownMenu: true,
        filters: true,
        columnSorting: true,
        cell: [
          {row: 0, col: 1, className: 'htRight'},
        ],
        mergeCells: [
          { row: 0, col: 1, rowspan: 1, colspan: 11 },
        ],
        fixedRowsTop: 1,
        fixedColumnsLeft: 1,
        persistentState: true,
        cells: function(row, col, prop) {
          const cellProperties = {};

          if (col >= 12) {
            cellProperties.className = 'htRight';
          }

          if (col == 0 || row == 0) {
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              Handsontable.renderers.TextRenderer.apply(this, arguments);
              td.style.color = '#222222';
              td.style.background = '#F0F0F0';
            }
          }

            return cellProperties
        },
        afterGetColHeader: function(col, th) {
          th.className = 'htLeft'
          if (col >= 12) {
            th.className = 'htRight';
          }
        }
        // renderer(instance, td, row, col, prop, value, cellProperties) {
        //     const escaped = Handsontable.helper.stringify(value);
        //     if(row == 0 && col == 0)
        //       console.log(instance, td, row, col, prop, value, cellProperties)

        //       Handsontable.renderers.TextRenderer.apply(this, arguments);

        //     return td;
        // }
      },
    };
  },
  head: {
    link: [
    ]
  },

  mounted(){
    console.log("Table mounted")
    var self = this
    const hotTableEl = this.$refs['hotTable']
    if(!hotTableEl) return
    const hot = this.$refs['hotTable'].hotInstance

    hot.addHook('afterColumnSort', (currentSortConfig, destinationSortConfigs)=>{
      self.addTotalRow(hot)
    })

    hot.addHook('beforeColumnSort', (currentSortConfig, destinationSortConfigs)=>{
      self.removeTotalRow(hot)
    })

    hot.addHook('afterFilter', (filterConidtions)=>{
      self.addTotalRow(hot)

      /* Save table filters */
      window.localStorage.ANALYTICS_FILTER_CONDITIONS = JSON.stringify(filterConidtions)
    })

    hot.addHook('beforeFilter', ()=>{
      self.removeTotalRow(hot)
    })

    /* Load table filters on mount */
    // this.loadTableFilters(hot)
  },
  methods:{
    addTotalRow(hotTable){
      console.log('add total row')
      hotTable.alter('insert_row', 0 , 1)
      // var mergeCells = hotTable.getPlugin('mergeCells')

      // hotTable.updateSettings({
      //   fixedRowsTop: 10
      // })
      // hotTable.render();

      // mergeCells.merge(0, 0, 0, 6)

      hotTable.updateSettings({
        cell: [
          {row: 0, col: 1, className: 'htRight'},
        ],
      })
      hotTable.setDataAtCell(0, 1, 'Totals');
      hotTable.setDataAtCell(0, 7, this.totals.total_count);
      hotTable.setDataAtCell(0, 8, this.totals.total_value);
      // hotTable.setDataAtCell(0, 9, this.totals.total_total_users);
      // hotTable.setDataAtCell(0, 10, this.totals.total_event_count_per_user);
    },
    removeTotalRow(hotTable){
      console.log('remove total row')
      hotTable.alter('remove_row', 0 , 1)
    },
    exportHotTableCSV(){

      const hotTableEl = this.$refs['hotTable']
      if(!hotTableEl) return

      const hot = this.$refs['hotTable'].hotInstance
      const exportPlugin = hot.getPlugin('exportFile');
      exportPlugin.downloadFile('csv', {
        bom: false,
        columnDelimiter: ',',
        columnHeaders: false,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'Attribute-CSV-file_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: true
      });
    },
    loadTableFilters(hotTable){
      var filterConditions = window.localStorage.ANALYTICS_FILTER_CONDITIONS ?? null
      filterConditions = JSON.parse(filterConditions)
      if(filterConditions){
        const filtersPlugin = hotTable.getPlugin('filters')
        for(var filterCond of filterConditions){
          console.log('filterCond', filterCond)
          if(filterCond.conditions){

            for(var condition of filterCond.conditions){
              filtersPlugin.addCondition(filterCond.column, condition.name, condition.args, filterCond.operation)
            }
          }
        }
        filtersPlugin.filter();
      }
    }
  },
  watch: {
    exportCSV: function (val) {
      console.log('export csv called')
      this.exportHotTableCSV()
    },
  }
}
</script>
