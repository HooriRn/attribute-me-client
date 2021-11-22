<template>
  <div class="page" :class="{ 'mobile-layout': !$device.isDesktop }">
    <div class="page-layout">
      <div class="side-menu-column" v-if="$device.isDesktop">
        <side-menu />
      </div>
      <div class="hands-table-column">
        <hot-table :settings="hotSettings"></hot-table>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './side-menu.vue';

export default {
  components: { SideMenu, HotTable, HotColumn },
  data() {
    return {
      channel_source: [
        "Bing",
        "Discord",
        "Facebook",
        "Google",
        "Instagram",
        "Linkedin",
        "Quora",
        "Reddit",
        "Snapchat",
        "Telegram",
        "TikTok",
        "Twitch",
        "Twitter",
        "Vimeo",
        "YouTube",
      ],
      linkGenerateData: linkGenerateData,
      hotSettings: {
        data: [['data1', 'data2'], ['data1', 'data2']],
        colHeaders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
      },
      tableSettings: {
        height: this.$device.isDesktop? 'calc( 100vh - 5.5625rem )' : '100%',
        licenseKey: 'non-commercial-and-evaluation',
        width: '100%',
        stretchH: 'all',
        rowHeaders: true,
        afterGetColHeader: function(col, th) {
          th.className = ['htLeft']
        },
        afterGetRowHeader: function(col, th) {
          th.className = 'htMiddle'
        },
        className: 'htMiddle',
        rowHeights: 43,
      }
    };
  },
  mounted() {
    console.log(this.linkGenerateData);
  },
  methods: {
    makeLink(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.BaseRenderer.apply(this, arguments);
      const data = instance.getSourceData()
      const datum = data[row]
      const preview = datum.preview ?? '';
      const channel = datum.channel.toLowerCase() ?? '';
      const campaign = datum.campaign ?? '';
      const handle = datum.handle ?? '';
      if (preview) {
        const url = new URL(preview);
        url.searchParams.append(`utm_source`, channel);
        url.searchParams.append(`utm_medium`, handle);
        url.searchParams.append(`utm_campaign`, campaign);

        let a = document.createElement('a');
        a.href = url.href;
        a.innerText = url.href
        a.target = '_blank'

        Handsontable.dom.empty(td)
        td.appendChild(a)
      }
      td.className = 'htMiddle'
      const plugin = instance.getPlugin('autoColumnSize');
      // console.log(plugin.calculateColumnsWidth(col, col, true))
    },
    showLink(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.BaseRenderer.apply(this, arguments);
      const data = instance.getSourceData()
      const datum = data[row]
      const preview = datum.preview ?? undefined;
      if (preview) {
        const url = new URL(preview);
        td.innerHTML = `<a href="${url.href}" target=”_blank”>${url.href}</a>`;
      }
      td.className = 'htMiddle'
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
