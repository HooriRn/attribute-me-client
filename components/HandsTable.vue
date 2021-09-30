<template>
  <div>
    <hot-table v-if="tableData.length > 0" :settings="settings" :data="tableData" ref="hotTable"></hot-table>
  </div>
</template>

<script>   
import Handsontable from 'handsontable';
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
            'Campaign Medium',
            'Campaign Name',
            'Campaign Source',
            'Event Name', 
            'Event Category', 
            'Event Label', 
            'Event Count', 
            'Event Value',
            'Total Users',
            'Events per User'
          ],
          rowHeaders: true,
          licenseKey: 'non-commercial-and-evaluation',
          height: '85vh',
          width: 'auto',
          overflow: 'hidden',
          readOnly: true,
          dropdownMenu: true,
          filters: true,
          columnSorting: true,
          mergeCells: [
            { row: 0, col: 0, rowspan: 1, colspan: 7 }
          ],
          fixedRowsTop: 1,
          // renderer(instance, td, row, col, prop, value, cellProperties) {
          //     const escaped = Handsontable.helper.stringify(value);
          //     if(row == 0 && col == 0)
          //       console.log(instance, td, row, col, prop, value, cellProperties)

          //       Handsontable.renderers.TextRenderer.apply(this, arguments);

          //     return td;
          // }
        },
        
          // style: 'width: 90vw; height: 90vh; overflow: hidden;'
      };
    },
    head: {
      link: [
        // { rel: 'stylesheet', type: 'text/css', 
        //   href: '/assets/css/handsontable.full.min.css' },
      ]
    },

    mounted(){
      var self = this
      const hot = this.$refs['hotTable'].hotInstance
      
      hot.addHook('afterColumnSort', (currentSortConfig, destinationSortConfigs)=>{
        self.addTotalRow(hot)
      })
      
      hot.addHook('beforeColumnSort', (currentSortConfig, destinationSortConfigs)=>{
        self.removeTotalRow(hot)
      }) 

      hot.addHook('afterFilter', (currentSortConfig, destinationSortConfigs)=>{
        self.addTotalRow(hot)
      })
      
      hot.addHook('beforeFilter', (currentSortConfig, destinationSortConfigs)=>{
        self.removeTotalRow(hot)
      }) 
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
        hotTable.setDataAtCell(0, 0, 'Totals');
        hotTable.setDataAtCell(0, 7, this.totals.total_count);
        hotTable.setDataAtCell(0, 8, this.totals.total_value);
        hotTable.setDataAtCell(0, 9, this.totals.total_total_users);
        hotTable.setDataAtCell(0, 10, this.totals.total_event_count_per_user);

      },
      removeTotalRow(hotTable){
        console.log('remove total row')
        hotTable.alter('remove_row', 0 , 1)
      },
      exportHotTableCSV(){
        const hot = this.$refs['hotTable'].hotInstance
        const exportPlugin = hot.getPlugin('exportFile');
        exportPlugin.downloadFile('csv', {
          bom: false,
          columnDelimiter: ',',
          columnHeaders: false,
          exportHiddenColumns: true,
          exportHiddenRows: true,
          fileExtension: 'csv',
          filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
          mimeType: 'text/csv',
          rowDelimiter: '\r\n',
          rowHeaders: true
        });
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