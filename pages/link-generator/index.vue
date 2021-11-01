<template>
  <div class="page" :class="{ 'mobile-layout': !$device.isDesktop }">
    <div class="page-layout">
      <div class="side-menu-column" v-if="$device.isDesktop">
        <side-menu />
      </div>
      <div class="hands-table-column">
        <hot-table class="hands-table" :data="linkGenerateData" :settings="tableSettings">
          <hot-column title="Device" read-only="true" data="device">
          </hot-column>
          <hot-column title="Funnel Mode" read-only="true" data="funnel">
          </hot-column>
          <hot-column title="Category" read-only="true" data="category">
          </hot-column>
          <hot-column title="Topic" read-only="true" data="topic">
          </hot-column>
          <hot-column title="Landing Page Preview" read-only="true" data="preview" :renderer="showLink">
          </hot-column>
          <hot-column title="Your Distribution Channel" data="channel" type="dropdown" :source="channel_source">
          </hot-column>
          <hot-column title="Your Campaign Name" data="campaign">
          </hot-column>
          <hot-column title="Your THOR.RUNE Address" data="handle">
          </hot-column>
          <hot-column title="Your Campaign URL" read-only="true" data="url" :renderer="makeLink">
          </hot-column>
          <hot-column title="Important Notes" read-only="true" data="note">
          </hot-column>
        </hot-table>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './side-menu.vue';
import { HotTable, HotColumn } from '@handsontable/vue';
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
      linkGenerateData: [
        {
          "device": "Mobile",
          "funnel": "Main Website",
          "category": "Homepage",
          "topic": "Root",
          "preview": "https://m.thorchain.org",
          "channel": "Twitter",
          "campaign": "",
          "handle": "",
          "url": "",
          "note": ""
        },
        {
          "device": "Mobile",
          "funnel": "Main Website",
          "category": "Getting Started",
          "topic": "Technology",
          "preview": "https://m.thorchain.org/technology",
          "channel": "Twitter",
          "campaign": "",
          "handle": "",
          "url": "",
          "note": ""
        },
      ],
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
