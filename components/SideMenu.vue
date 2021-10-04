<template>
  <div class="side-menu">
    <div class="date-range-field">
      <div class="field-title">Date range</div>
      <div
        @click="toggleDatePicker"
        class="date-input"
        :class="{ 'date-input-active': showDatePicker }"
      >
        <div class="date-input-text" style="font-size: 0.875rem; color: #202124;">{{ dateInputValue }}</div>
        <img src="~/assets/img/triangle.svg" />
      </div>
      <div :hidden="!showDatePicker" class="date-picker-holder">
        <date-range-picker
          width="18.75rem"
          :from="$route.query.from"
          :to="$route.query.to"
          :panel="$route.query.panel"
          @update="applyFilter"
          :theme="datepickerTheme"
        />
      </div>

      <div style="margin-left: 10px;">
        <b-form-checkbox @change="dailySwitchChanged" class="hourly-checkbox" v-model="hourlyChecked" name="check-button" switch>
          <div>Hourly data</div>
        </b-form-checkbox>
      </div>
    </div>
    <hr class="divider" />
    <div class="present-filters-filed">
      <div class="field-title">Preset filters</div>
      <div class="filters-scroll">
        <div
          class="side-menu-item"
          v-for="filter of filters"
          :key="filters.indexOf(filter)"
        >
          <b-button
            @click="activate(filter.name)"
            class="side-menu-item"
            :class="{
              'side-menu-button-active': activeItem == filter.name,
              'side-menu-single-active': activeItem == filter.name && !filter.childs
            }"
            v-b-toggle="filter.name"
          >
            <div class="d-flex justify-content-between">
              {{ filter.name }}
              <img v-if="filter.childs" src="~/assets/img/triangle.svg" />
            </div>
          </b-button>

          <b-collapse
            :ref="filter.name"
            v-if="filter.childs"
            :id="filter.name"
            class="mt-2 childs-list"
          >
            <div
              v-for="child of filter.childs"
              :key="filter.childs.indexOf(child)"
              @click="filterBtnClicked(filter.name, child.name)"
              class="side-menu-button"
              :class="{
                'side-menu-button-active':
                  activeBtn == filter.name + '&' + child.name,
              }"
            >
              {{ child.name }}
            </div>
          </b-collapse>
        </div>
      </div>

      <div>
        <!-- Via space separated string of IDs passed to directive value -->

        <!-- Elements to collapse -->

        <b-collapse id="collapse-b" class="mt-2">
          <b-card>I am collapsible content B!</b-card>
        </b-collapse>
      </div>
    </div>
    <hr class="divider" />
    <div class="side-menu-item" >
      <b-button class="side-menu-button" style="line-height: 0;">Documentation</b-button>
    </div>
  </div>
</template>

<script>
import { getServerCustomDateString, getDateInputValue } from "../utils";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["sideMenuDateLabel"]),
    ...mapGetters(["tableSetting"]),
  },
  data() {
    return {
      showDatePicker: false,
      activeItem: null,
      activeBtn: null,
      hourlyChecked: false,
      dateInputValue: "##-##-## to ##-##-##",
      filters: [
        { name: "All data" },
        {
          name: "THORChain.org",
          childs: [
            { name: "All Events" },
            { name: "Website Loads" },
            { name: "Promotions" },
            { name: "Social" },
            { name: "Tool" },
            { name: "Article" },
            { name: "Video" },
            { name: "Document" },
            { name: "Paper" },
          ],
        },
        {
          name: "SKIP.exchange",
          childs: [
            { name: "All Events" },
            { name: "Interface Loads" },
            { name: "New Wallets" },
            { name: "Swap Preps" },
            { name: "Swaps" },
            { name: "RUNE Upgrade" },
            { name: "Deposits" },
            { name: "Withdrawal Preps" },
            { name: "Withdrawals" },
            { name: "Network Fees" },
          ],
        },
      ],
      datepickerTheme: {
        primary: "#ff6640",
        secondary: "#2D3E50",
        ternary: "#93A0BD",
        border: "#e6e6e6",
        light: "#ffffff",
        dark: "#000000",
        hovers: {
          day: "#CCC",
          range: "#e6e6e6",
        },
      },
    };
  },

  methods: {
    applyFilter(args) {
      console.log(args);
      var from = new Date(args.from);
      var to = new Date(args.to);
      var startDate = getServerCustomDateString(from, "01");
      var endDate = getServerCustomDateString(to, "23");
      this.dateInputValue = getDateInputValue(startDate, endDate);

      var tableSetting = this.tableSetting;
      tableSetting["startDate"] = startDate;
      tableSetting["endDate"] = endDate;
      this.showDatePicker = false;
      this.$store.commit("tableSetting", tableSetting);
    },

    activate(filterName) {
      if (this.activeItem === filterName) this.activeItem = null;
      else this.activeItem = filterName;
      if (filterName === "All data") {
        this.activeBtn = null;
        for (var key in this.$refs) {
          var ref = this.$refs[key][0];
          if (ref.show) ref.toggle();
        }
        var tableSetting = this.tableSetting;
        tableSetting["filter_website"] = "";
        tableSetting["present_filter"] = "";
        this.$store.commit("tableSetting", tableSetting);
      }
      console.log(this.activeItem);
    },
    filterBtnClicked(parentBtnName, childBtnName) {
      var newBtn = parentBtnName + "&" + childBtnName;
      var tableSetting = this.tableSetting;
      if (this.activeBtn === newBtn) {
        this.activeBtn = null;
        // tableSetting['filter_website'] = ''
        // tableSetting['present_filter'] = ''
      } else {
        this.activeBtn = newBtn;
        tableSetting["filter_website"] = parentBtnName;
        tableSetting["present_filter"] = childBtnName;
        this.$store.commit("tableSetting", tableSetting);
      }
    },
    toggleDatePicker() {
      console.log("toggle");
      this.showDatePicker = !this.showDatePicker;
      console.log(this.showDatePicker);
    },
    dailySwitchChanged(){
        var tableSetting = this.tableSetting;
        tableSetting["daily"] = !this.hourlyChecked;
        this.$store.commit("tableSetting", tableSetting);
    }
  },
  watch: {
    sideMenuDateLabel: function (val) {
      this.dateInputValue = val;
    },
  },
};
</script>

<style lang="scss">
/* This needs to be global */
.mj-daterange-picker .preset-ranges .preset {
  font-size: 0.875rem;
}


.divider {
  margin-left: 0.625rem;
}

.side-menu {
  padding-right: 1.25rem;

  .filters-scroll {
    max-height: calc(100vh - 14.5rem);
    overflow-y: scroll;
    overflow-x: hidden;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .field-title {
    padding-left: 0.625rem;
  }
}
.hourly-checkbox{
    margin: 0.2rem 0;
    font-family: ProductSans;
    font-size: 0.875rem;
    line-height: 1.5rem;
    color: #202124;
    span{
        font-size: 0.5rem;
    }
}
.side-menu-item {
  .side-menu-button {
    /* font-family: ProductSans; */
    font-family: ProductSans;
    font-size: 0.875rem;
    line-height: 2.5rem;
    color: #202124;
    border-radius: 0 0.375rem 0.375rem 0;
    background-color: transparent;
    border: none;
    display: block;
    min-width: 100%;
    text-align: left;
    padding-left: 1.25rem;
    cursor: pointer;
    height: 2.625rem;

    &:hover {
      // color: #fd624f;
      background-color: #F3f3f3;
      border: none;
    }
    &:active {
      background-color: #F3f3f3;
      border: none;
      color: #000b12;
      border: none;
    }
    &:focus, &:active {
      box-shadow: none !important;
    }
  }
  .childs-list {
    margin: 0 !important;

    .side-menu-button {
      padding-left: 1.875rem;
    }
  }
  .side-menu-button-active {
    color: #fd624f;
    // background-color: #F3f3f3;
    border-radius: 0 0.375rem 0.375rem 0;
    border: none;
    &:focus {
      box-shadow: none;
    }
    &.not-collapsed {
      color: #000b12;
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
    padding: 0 1.25rem;
    border-radius: 0 0.375rem 0.375rem 0;
    cursor: pointer;
    box-shadow: none !important;

    &.not-collapsed {
      img {
        transform: rotate(180deg);
      }
    }

    &:hover {
      // color: #fd624f;
      background-color: #F3f3f3;
      border-radius: 0 0.375rem 0.375rem 0;
      border: none;
    }
  }
  .side-menu-item.side-menu-button-active {
    color: #fd624f;
    // background-color: #F3f3f3;
    border-radius: 0 0.375rem 0.375rem 0;
    border: none;
  }
  .side-menu-item.not-collapsed {
    color: #000b12;
    background-color: #F3f3f3;
    border-radius: 0 0.375rem 0.375rem 0;
    border: none;
  }
  .side-menu-item.collapsed {
    color: #000b12;
  }
  .side-menu-single-active {
    color: #fd624f !important;
    border-radius: 0 0.375rem 0.375rem 0;
    border: none;
  }

  .childs-list {
    margin-left: 1rem;
  }
}
.date-range-field {
  position: relative;
  .date-picker-holder {
    z-index: 1000;
    background-color: #fff;
    position: absolute;
    transform: scale(0.8);
    transform-origin: left top;
    left: 100%;
    top: 0;
  }

  .date-input {
    display: flex;
    justify-content: space-between;
    font-family: ProductSans;
    line-height: 2.5rem;
    color: #202124;
    padding: 0 0.3rem;
    padding-left: 0.625rem;
    user-select: none;
    &:hover {
      background-color: #F3f3f3;
      border: none;
      color: #000b12;
      border-radius: 0 0.375rem 0.375rem 0;
      border: none;
      cursor: pointer;
    }
  }
  .date-input-active {
    background-color: #F3f3f3;
    border: none;
    color: #000b12;
    border-radius: 0;
    border: none;
    img {
      transform: rotate(270deg);
    }
  }
}

.mj-daterange-picker {
}

.field-title {
  font-family: ProductSans;
  font-size: 0.875rem;
  line-height: 2.5rem;
  color: #5f6368;
}


</style>
