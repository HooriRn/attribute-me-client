<template>
  <div>
    <hot-table v-if="tableData.length > 0" :settings="settings" :data="tableData"></hot-table>
  </div>
</template>

<script>   

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
          fixedRowsTop: 1
        },
          // style: 'width: 90vw; height: 90vh; overflow: hidden;'
      };
    },
    head: {
      link: [
        // { rel: 'stylesheet', type: 'text/css', 
        //   href: '/assets/css/handsontable.full.min.css' },
      ]
    }
  }
</script>