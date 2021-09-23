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
          <hot-column data="topic" read-only="true">
          </hot-column>
          <hot-column title="Landing Page Preview" read-only="true" data="preview" :renderer="showLink">
          </hot-column>
          <hot-column title="Your Distribution Channel" read-only="true" data="channel">
          </hot-column>
          <hot-column title="Your Campaign Name" data="campaign">
          </hot-column>
          <hot-column title="Your Handle" data="handle">
          </hot-column>
          <hot-column title="Your Campaign URL" read-only="true" data="url" :renderer="makeLink">
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
          url: ''
        },
        { category: 'Swapping',
          topic: 'How to swap cross-chain?',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: ''
        },
        { category: 'Pooling',
          topic: '',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: ''
        },
        { category: 'Ecosystem',
          topic: '',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: ''
        },
        { category: 'Security',
          topic: '',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: ''
        },
        { category: 'Decentralization',
          topic: '',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: ''
        },
        { category: 'Nodes',
          topic: '',
          preview: '',
          channel: 'Twitter',
          campaign: '',
          handle: '',
          url: ''
        }
      ],
      tableSettings: {
        height: '100%',
        licenseKey: 'non-commercial-and-evaluation',
      }
    };
  },
  methods: {
    makeLink(instance, td, row, col, prop, value, cellProperties) {
      const data = instance.getSourceData()
      const datum = data[row]
      const preview = datum.preview ?? '';
      const channel = datum.channel ?? '';
      const campaign = datum.campaign ?? '';
      const handle = datum.handle ?? '';
      if (preview) {
        const url = new URL(preview);
        url.searchParams.append(`utm_source`, channel);
        url.searchParams.append(`utm_medium`, handle);
        url.searchParams.append(`utm_campaign`, campaign);
        td.innerHTML = `<a href="${url.href}">${url.href}</a>`;
      }
    },
    showLink(instance, td, row, col, prop, value, cellProperties) {
      const data = instance.getSourceData()
      const datum = data[row]
      const preview = datum.preview ?? undefined;
      if (preview) {
        const url = new URL(preview);
        td.innerHTML = `<a href="${url.href}">${url.href}</a>`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//For now I put the side menu style here. It's needed to be global
.field-title {
  padding-left: 20px;
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
  // height: 42px;
  background-color: transparent;
  border: none;
  display: block;
  min-width: 100%;
  text-align: left;
  padding: 0.3rem;
  padding-left: 20px;
  border-radius: 0 6px 6px 0;
  cursor: pointer;

  &:hover {
    color: #FD624F;
    background-color: #dadce0;
    border-radius: 0 6px 6px 0;
  }
}

.hands-table-column {
  background: #fff;
  border: 1px solid #ccc;
}

</style>
