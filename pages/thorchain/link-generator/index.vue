<template>
  <div class="page" :class="{ 'mobile-layout': !$device.isDesktop }">
    <div class="page-layout">
      <div class="side-menu-column">
        <side-menu />
      </div>
      <div class="hands-table-column">
        <hot-table :settings="tableSettings" ref="hotTable">
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
          <hot-column title="Distribution Channel" data="channel" type="dropdown" :source="channel_source">
          </hot-column>
          <hot-column title="Campaign Name" data="campaign">
          </hot-column>
          <hot-column title="THOR.RUNE Address" data="handle">
          </hot-column>
          <hot-column title="Generated Link" read-only="true" data="url" :renderer="makeLink">
          </hot-column>
          <hot-column title="Targeting Notes" read-only="true" data="note">
          </hot-column>
        </hot-table>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './side-menu.vue';
import data from './link-generator';

export default {
  components: { SideMenu },
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
        "Other"
      ],
      tableSettings: {
        data,
        height: this.$device.isDesktop? 'calc( 100vh - 5.5625rem )' : 'calc( 100vh - 9.4375rem )',
        licenseKey: 'non-commercial-and-evaluation',
        width: this.$device.isDesktop? this.getTableWidth() : '100%',
        stretchH: 'all',
        rowHeaders: true,
        autoColumnSize: true,
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
    console.log(window)
    window.addEventListener("resize", this.resizeTable);
  },
  methods: {
    getScrollbarWidth() {
      // Creating invisible container
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll'; // forcing scrollbar to appear
      outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
      document.body.appendChild(outer);

      // Creating inner element and placing it in the container
      const inner = document.createElement('div');
      outer.appendChild(inner);

      // Calculating difference between container's full width and the child width
      const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

      // Removing temporary elements from the DOM
      outer.parentNode.removeChild(outer);

      return scrollbarWidth;
    },
    resizeTable() {
      if (!this.$device.isDesktop) return
      const hotTableEl = this.$refs['hotTable']
      if(!hotTableEl) return
      const hot = this.$refs['hotTable'].hotInstance;
      hot.updateSettings({
        width: this.getTableWidth()
      })
    },
    getTableWidth() {
      if (document.body.offsetWidth <= 1200) {
        return `calc( 1200px - 13.375rem )`
      }
      else {
        return `calc( 100vw - 13.375rem - ${this.getScrollbarWidth()}px)`
      }
    },
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
