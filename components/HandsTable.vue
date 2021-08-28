<template>
  <div>
    <HotTable v-if="tableData.length > 0" :settings="settings" :data="tableData"></HotTable>
  </div>
</template>

<script>   
import HotTable from '~/plugins/vue-handsontable'

  export default {
    props: {
      tableData: {
        type: Array,
        default(){
          return [
            ["", "Ford", "Volvo", "Toyota", "Honda"],
            ["2016", 10, 11, 12, 13]
          ] 
        } 
      }
    },
    data: function() {
      return {
        settings: {
          colHeaders: ['Date & Hour', 'Campaign Medium', 'Event Name', 'Event Category', 'Event Label', 'Event Count', 'Event Value'],
          rowHeaders: true,
          licenseKey: 'non-commercial-and-evaluation',
          width: 'auto',
          height: '90vh',
          width: '97vw',
          overflow: 'hidden',
          readOnly: true,
          dropdownMenu: true,
          filters: true,
          columnSorting: true,
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
    components: {
      HotTable    
    }
  }
</script>