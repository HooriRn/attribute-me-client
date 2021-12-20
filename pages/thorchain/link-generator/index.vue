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
          <hot-column title="Type" read-only="true" data="funnel">
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
          <hot-column title="THOR Address" data="handle">
          </hot-column>
          <hot-column title="Your Campaign Destination Link" read-only="true" data="url" :renderer="makeLink">
          </hot-column>
          <hot-column title="Notes for SKALD Community Marketers" read-only="true" data="note">
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
        "Affiliate",
        "Content",
        "Direct",
        "Display",
        "Email",
        "Events",
        "Influencer",
        "Partner",
        "Press Release",
        "Retargeting",
        "Search Organic",
        "Search Paid",
        "Social Media",
        "SMS",
        "Video",
        "Not Listed"
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
      }
    };
  },
  mounted() {
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
    async getRebrandlyLink(preview, channel, handle, campaign) {
      let rebrandlyRes = await this.$axios.$post(process.env.MS_URL + '/link', { preview, channel, handle, campaign }).catch(error => {
        if (error.response) {
          // Request made and server responded
          if (error.response.data.length > 0)
            throw error.response.data;
          else
            throw error.response.statusText;
        }
      });
      return rebrandlyRes;
    },
    makeLink(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.BaseRenderer.apply(this, arguments);
      const data = instance.getSourceData()
      const datum = data[row]
      const preview = datum.preview ?? '';
      const channel = datum.channel?.toLowerCase() ?? '';
      const campaign = datum.campaign ?? '';
      const handle = datum.handle ?? '';
      if (td.querySelector('a') && td.querySelector('a').innerText !== 'Generate') {
        return;
      }
      if (preview && channel && campaign && handle) {
        let a = document.createElement('a');
        a.innerText = 'Generate';
        a.classList.add('generate');
        var innerClick = () => {
          var self = this;
          //making load text
          var handler = async function() {
            // getting the api
            Handsontable.dom.empty(td);
            a = document.createElement('a');
            self.getRebrandlyLink(preview, channel, handle, campaign).then((rebrandlyLink) => {
              a.innerText = rebrandlyLink;
              a.href = rebrandlyLink;
              a.target = '_blank'
              a.removeEventListener('click', handler)
              td.appendChild(a)
            }).catch(error => {
              a.innerText = error;
              a.removeEventListener('click', handler);
              a.classList.add('error')
              td.appendChild(a)
            });
            a.innerText = 'Generating'
            a.removeEventListener('click', handler)
            td.appendChild(a)
          }
          return handler();
        }
        a.addEventListener('click', innerClick);
        Handsontable.dom.empty(td)
        td.appendChild(a)
      }
      else {
        let a = document.createElement('a');
        a.innerText = 'Generate';
        a.classList.add('generate', 'center', 'disable');
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

<style lang="scss">
.generate {
  cursor: pointer;
  &.disable {
    cursor: initial;
    color: #777;
  }
  &.center {
    text-align: center;
  }
}
.error {
  color: #fd624f;
}
</style>
