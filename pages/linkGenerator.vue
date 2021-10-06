<template>
  <div class="page">
    <div class="page-layout">
      <div class="side-menu-column">
        <div class="side-menu">
          <div class="present-filters-filed">
            <div class="field-title">Funnel categories</div>
            <div class="filters-scroll">
              <div
                class="side-menu-item"
                v-for="category of categories"
                :key="categories.indexOf(category)"
              >
                <span>{{ category.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hands-table-column">
        <hot-table class="hands-table" :data="linkGenerateData" :settings="tableSettings">
          <hot-column title="Category" read-only="true" data="category">
          </hot-column>
          <hot-column title="Topic" data="topic" read-only="true">
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
export default {
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
      categories: [
        {
          name: "Security",
        },
        {
          name: "Decentralization",
        },
        {
          name: "Swapping",
        },
        {
          name: "Pooling",
        },
        {
          name: "Ecosystem",
        },
      ],
      linkGenerateData: [
        { category: 'Tokenomics',
          topic: 'Forecast the value of RUNE',
          preview: 'https://www.thorchain.org/rune',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: '',
          note: ''
        },
        { category: 'Swapping',
          topic: 'How to swap cross-chain?',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: '',
          note: ''
        },
        { category: 'Pooling',
          topic: '',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: '',
          note: ''
        },
        { category: 'Ecosystem',
          topic: '',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: '',
          note: ''
        },
        { category: 'Security',
          topic: '',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: '',
          note: ''
        },
        { category: 'Decentralization',
          topic: '',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: '',
          note: ''
        },
        { category: 'Nodes',
          topic: '',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: '',
          note: ''
        }
      ],
      tableSettings: {
        height: 'calc( 100vh - 5.5625rem )',
        licenseKey: 'non-commercial-and-evaluation',
        width: 'auto',
        stretchH: 'last',
        afterGetColHeader: function(col, th) {
          th.className = 'htLeft'
        }
      }
    };
  },
  methods: {
    makeLink(instance, td, row, col, prop, value, cellProperties) {
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
        td.innerHTML = `<a href="${url.href}" target=”_blank”>${url.href}</a>`;
      }
    },
    showLink(instance, td, row, col, prop, value, cellProperties) {
      const data = instance.getSourceData()
      const datum = data[row]
      const preview = datum.preview ?? undefined;
      if (preview) {
        const url = new URL(preview);
        td.innerHTML = `<a href="${url.href}" target=”_blank”>${url.href}</a>`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//For now I put the side menu style here. It's needed to be global
.field-title {
  padding-left: 1.25rem;
}

.filters-scroll {
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
}

.side-menu-item {
  font-family: ProductSans;
  font-size: 0.875rem;
  line-height: 2.5rem;
  color: #202124;
  height: 2.625rem;
  background-color: transparent;
  border: none;
  display: block;
  min-width: 100%;
  text-align: left;
  padding-left: 20px;
  border-radius: 0 6px 6px 0;
  cursor: pointer;

  &:hover {
    background-color: #F3f3f3;
    color: #000b12;
    border-radius: 0 6px 6px 0;
  }
}
</style>
